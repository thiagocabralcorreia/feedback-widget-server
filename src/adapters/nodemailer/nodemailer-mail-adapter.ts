import nodemailer from 'nodemailer'; 
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'a2a38cf27992f8',
      pass: 'f085b92fb27ba7'
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: 'Feedback Widget Team <hi@fwt.com>',
            to: 'Thiago <thiagocabralcorreia@gmail.com>',
            subject: 'New feedback',
            html: body
        })
    }
}