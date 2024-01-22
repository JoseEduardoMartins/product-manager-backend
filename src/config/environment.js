import * as dotenv from 'dotenv';
dotenv.config();

export const server = {
    port: process.env.APP_PORT || 3000,
    path: process.env.APP_PATH || '/api',
    key: process.env.APP_KEY || '',
};

export const database = {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'contacts_db',
};

export default { server, database };
