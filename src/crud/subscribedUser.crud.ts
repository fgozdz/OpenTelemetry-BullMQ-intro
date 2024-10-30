import PGClient from '../db';
import { SubscribedUser } from '../models/subscribedUser.model';


class SubcribedUserCRUD {
    private pgClient: typeof PGClient.manager;
    private model: typeof SubscribedUser = SubscribedUser;

    constructor() {
        this.pgClient = PGClient.manager;
    }

    async create(email: string) {
        const exist = await this.read(email);
        if (!!exist) {
            return false;
        }

        const newSubscribedUser = new this.model();
        newSubscribedUser.email = email;

        return await this.pgClient.save(newSubscribedUser);
    }

    async read(email: string) {
        return await this.pgClient.getRepository(this.model).findOneBy({
            email: email
        });
    }

    async delete(email: string) {
        const subscribedUser = await this.read(email);
        if (!subscribedUser) {
            return false;
        }

        return await this.pgClient.getRepository(this.model).remove(subscribedUser);
    }
}

export default new SubcribedUserCRUD();