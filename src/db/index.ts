import { DataSource } from 'typeorm';
import { SubscribedUser } from '../models/subscribedUser.model';
import config from '../config';

const { postgresConfig } = config;

class PGClient {
    private client: DataSource;

    constructor() {
        this.client = new DataSource({
            type: 'postgres',
            host: postgresConfig.host,
            port: postgresConfig.port,
            username: postgresConfig.user,
            password: postgresConfig.pass,
            database: postgresConfig.db,
            entities: [SubscribedUser],
            synchronize: true,
            logging: false
        });
    }

    async init() {
        try {
            await this.client.initialize();
            console.log('database connected');
        } catch (err) {
            console.log('database connection error: ', err)
        }
        
    }

    async disconnect() {
        await this.client.destroy();
    }

    get clientInstance() {
        return this.client;
    }

    get manager() {
        return this.client.manager;
    }
}

export default new PGClient();

