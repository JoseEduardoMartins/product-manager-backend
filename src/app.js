import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { environment, logger, routes } from './config';

const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(
    logger('common', {
        stream: fs.createWriteStream('./access.log', { flags: 'a' }),
    }),
);
app.use(logger('dev'));

routes.forEach((route) => app.use(environment.server.path, route));

export default app;
