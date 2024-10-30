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
};