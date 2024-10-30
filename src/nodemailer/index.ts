import nodemailer from 'nodemailer';
import config from '../config';

const { nodemailerConfig } = config;

const transporter = nodemailer.createTransport({
    host: nodemailerConfig.host,
    port: nodemailerConfig.port,
    auth: {
        user: nodemailerConfig.auth.user,
        pass: nodemailerConfig.auth.pass
    }
});

export default transporter;