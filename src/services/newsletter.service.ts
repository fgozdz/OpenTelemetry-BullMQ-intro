import nodemailer from '../nodemailer';
import SubscribedUserCrud from '../crud/subscribedUser.crud';

class NewsletterService {
    private subscribedUserCRUD: typeof SubscribedUserCrud;;

    constructor() {
        this.subscribedUserCRUD = SubscribedUserCrud;
    }

    async subscribeToNewsletter(email: string) {
        const subscribedUser = await this.subscribedUserCRUD.create(email);
        if (!subscribedUser) {
            return false;
        }

        await nodemailer.sendMail({
            from: 'newsletter@example.email',
            subject: 'Subscribed to newsletter',
            text: 'You have succesfully subscribed to a newsletter',
            to: `${email}`,
        });

        return subscribedUser;
    }

    async unsubcribeFromNewsletter(email: string) {
        const removedUser = await this.subscribedUserCRUD.delete(email);
        if (!removedUser) {
            return false;
        }

        await nodemailer.sendMail({
            from: 'newsletter@example.email',
            subject: 'Unsubscribed from a newsletter',
            text: 'You have succesfully unsubscribed from a newsletter',
            to: `${email}`,
        })
        
        return removedUser;
    }
}

export default new NewsletterService();