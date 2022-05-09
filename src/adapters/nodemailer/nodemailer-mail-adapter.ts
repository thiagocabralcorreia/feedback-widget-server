import nodemailer, { Transporter } from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";

export class NodemailerMailAdapter implements MailAdapter {
  private transport: Transporter;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'a2a38cf27992f8',
        pass: 'f085b92fb27ba7'
      }
    });
  }

  async sendMail({ subject, content }: SendMailData) {
    await this.transport.sendMail({
      from: 'Feedback Widget Team <hi@fwt.com>',
      to: 'Thiago <thiagocabralcorreia@gmail.com>',
      subject,
      html: content,
    })
  }
}