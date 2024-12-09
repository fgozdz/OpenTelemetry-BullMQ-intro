import { NodemailerInterface } from '../interfaces/nodemailer.interface';
import { Queue } from 'bullmq';
import config from '../config';
import SubscribedUserCrud from '../crud/subscribedUser.crud';
import { BullMQOtel } from 'bullmq-otel';

const { bullmqConfig } = config;

class NewsletterService {
    private queue: Queue;
    private subscribedUserCRUD: typeof SubscribedUserCrud;
    private cronPattern = '0 0 12 * * 5';

    constructor() {
        this.queue = new Queue<NodemailerInterface>(bullmqConfig.queueName, {
            connection: bullmqConfig.connection,
            telemetry: new BullMQOtel('example-tracer'),
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
            text: 'You have successfully subscribed to a newsletter',
            to: `${email}`,
        });

        console.log(`Enqueued an email sending`);

        await this.startsendingWeeklyEmails(email);

        return subscribedUser;
    }

    async unsubscribeFromNewsletter(email: string) {
        const removedUser = await this.subscribedUserCRUD.delete(email);
        if (!removedUser) {
            return false;
        }

        await this.queue.add('send-simple', {
            from: 'newsletter@example.email',
            subject: 'Unsubscribed from a newsletter',
            text: 'You have successfully unsubscribed from a newsletter',
            to: `${email}`,
        });

        console.log(`Enqueued an email sending`);

        const result = await this.stopSendingWeeklyEmails(email);
        console.log(result ? `scheduler for email: ${email} removed` : `scheduler for email: ${email} not found`);

        return removedUser;
    }

    private async startsendingWeeklyEmails(email: string) {
        await this.queue.upsertJobScheduler(
            `${email}`,
            { pattern: this.cronPattern },
            {
                name: 'send-weekly-newsletter',
                data: {
                    from: 'newsletter@example.email',
                    subject: 'weekly newsletter',
                    text: 'newsletter',
                    to: `${email}`,
                }
            }
        );
    }

    private async stopSendingWeeklyEmails(email: string) {
        return this.queue.removeJobScheduler(`${email}`);
    }
}

export default new NewsletterService();