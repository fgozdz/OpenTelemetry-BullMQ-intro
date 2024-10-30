class NewsletterService {
    constructor() {}

    async subscribeToNewsletter(email: string) {
        return false;
    }

    async unsubcribeFromNewsletter(email: string) {
        return false;
    }
}

export default new NewsletterService();