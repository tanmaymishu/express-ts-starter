import { User } from '@/database/sql/entities/user.entity';
import { transporter } from '@/util/mailer';

export default class SendWelcomeEmail {
  static jobName = 'sendWelcomeEmail';

  constructor(public user: User) {}

  async handle() {
    await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: this.user.email,
      subject: 'Welcome',
      html: `<b>Hello ${this.user.firstName}, welcome to the App.</b>`
    });
  }
}
