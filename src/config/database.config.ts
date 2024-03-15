import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 3306,
  name: process.env.DATABASE_NAME || 'product_manager',
  username: process.env.DATABASE_USERNAME || 'root',
  userpassword: process.env.DATABASE_USERPASSWORD || 'root',
}));
