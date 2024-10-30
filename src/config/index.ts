import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    nodemailerConfig: {
        host: process.env.NODEMAILER_HOST,
        port: parseInt(process.env.NODEMAILER_PORT),
        auth: {
            user: process.env.NODEMAILER_AUTH_USER,
            pass: process.env.NODEMAILER_AUTH_PASS
        }
    },
    postgresConfig: {
        user: process.env.POSTGRES_USER,
        pass: process.env.POSTGRES_PASSWORD,
        db: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || '5432')
    },
    bullmqConfig: {
        concurrency: parseInt(process.env.BULLMQ_QUEUE_CONCURRENCY || '1'),
        queueName: process.env.BULLMQ_QUEUE_NAME || 'mailbot',
        connection: {
          host: process.env.BULLMQ_REDIS_HOST || 'redis',
          port: parseInt(process.env.BULLMQ_REDIS_PORT || '6379'),
        },
    },
};