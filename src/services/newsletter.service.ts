import { NodemailerInterface } from '../interfaces/nodemailer.interface';
import { Queue } from 'bullmq';
import config from '../config';
import SubscribedUserCrud from '../crud/subscribedUser.crud';
import { BullMQOtel } from 'bullmq-otel';

const { bullmqConfig } = config;

class NewsletterService {
    private queue: Queue;
    private subscribedUserCRUD: typeof SubscribedUserCrud;

    constructor() {
        this.queue = new Queue<NodemailerInterface>(bullmqConfig.queueName, {
            connection: bullmqConfig.connection,
            telemetry: new BullMQOtel('example-tracer')
        });

        this.subscribedUserCRUD = SubscribedUserCrud;
    }

    async subscribeToNewsletter(email: string) {
        const subscribedUser = await this.subscribedUserCRUD.create(email);
        if (!subscribedUser) {
            return false;
        }

        await this.queue.add('send-simple', {
            from: 'newsletter@example.email',
            subject: 'Subscribed to newsletter',
            text: 'You have succesfully subscribed to a newsletter',
            to: `${email}`,
        });

        console.log(`Enqueued an email sending`);

        return subscribedUser;
    }

    async unsubcribeFromNewsletter(email: string) {
        const removedUser = await this.subscribedUserCRUD.delete(email);
        if (!removedUser) {
            return false;
        }

        await this.queue.add('send-simple', {
            from: 'newsletter@example.email',
            subject: 'Unsubscribed from a newsletter',
            text: 'You have succesfully unsubscribed from a newsletter',
            to: `${email}`,
        });

        console.log(`Enqueued an email sending`);

        return removedUser;
    }
}

export default new NewsletterService();