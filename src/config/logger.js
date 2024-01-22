import logger from 'morgan';

logger.token('body', (req) => Object.keys(req.body).length && JSON.stringify(req.body, null, 2));

export default logger;
