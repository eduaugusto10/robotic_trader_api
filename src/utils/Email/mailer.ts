import nodemailer from 'nodemailer'
import config from '../../config/mail'

export const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    auth: {
        user: config.user,
        pass: config.password
    }
});

