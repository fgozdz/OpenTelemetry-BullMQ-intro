import nodemailer from '../nodemailer';

class NewsletterService {
    constructor() {}

    async subscribeToNewsletter(email: string) {
        await nodemailer.sendMail({
            from: 'newsletter@example.email',
            subject: 'Subscribed to newsletter',
            text: 'You have succesfully subscribed to a newsletter',
            to: `${email}`,
        });
        return true;
    }

    async unsubcribeFromNewsletter(email: string) {
        await nodemailer.sendMail({
            from: 'newsletter@example.email',
            subject: 'Unsubscribed from a newsletter',
            text: 'You have succesfully unsubscribed from a newsletter',
            to: `${email}`,
        })
        return true;
    }
}

export default new NewsletterService();