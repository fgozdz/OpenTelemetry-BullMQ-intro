import { Request, Response, NextFunction } from 'express';
import NewsletterService from '../services/newsletter.service';

class NewsletterController {
    constructor() {
        this.subscribeToNewsletter = this.subscribeToNewsletter.bind(this);
        this.unsubcribeFromNewsletter = this.unsubcribeFromNewsletter.bind(this);
    }

    async subscribeToNewsletter(req: Request, res: Response, next: NextFunction) {
        try {
            const subscribedUser = await NewsletterService.subscribeToNewsletter(req.body.email);
            if (!subscribedUser) {
                return res.json({message: 'user already subscribed'});
            }

            return res.json(subscribedUser);
        } catch(err) {
            return next(err);
        }
    }
    
    async unsubcribeFromNewsletter(req: Request, res: Response, next: NextFunction) {
        try {
            const unsubscribedUser = await NewsletterService.unsubscribeFromNewsletter(req.body.email);
            if (!unsubscribedUser) {
                return res.json({message: 'user is not a member of a newsletter'});
            }

            return res.json(unsubscribedUser);
        } catch(err) {
            return next(err);
        }
    }
}

export default new NewsletterController();