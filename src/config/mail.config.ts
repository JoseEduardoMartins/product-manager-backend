import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST || 'localhost',
  port: process.env.MAIL_PORT || 3306,
  user: process.env.MAIL_USER || 'root',
  password: process.env.MAIL_PASSWORD || 'root',
}));
