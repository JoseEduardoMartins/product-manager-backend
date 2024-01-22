import { createPool } from 'mysql';
import { database } from './environment';

const connection = createPool(database);

export const runQuery = async (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
};

export default runQuery;
