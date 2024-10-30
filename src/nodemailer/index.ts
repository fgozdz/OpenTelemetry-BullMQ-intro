import nodemailer from 'nodemailer';
import { Job } from 'bullmq';
import config from '../config';
import { NodemailerInterface } from '../interfaces/nodemailer.interface';

const { nodemailerConfig } = config;

const transporter = nodemailer.createTransport({
    host: nodemailerConfig.host,
    port: nodemailerConfig.port,
    auth: {
        user: nodemailerConfig.auth.user,
        pass: nodemailerConfig.auth.pass
    }
});

export default (job: Job<NodemailerInterface>) => transporter.sendMail(job.data);