import { UserDataBase, UserApi } from '../models/user.model';
import { runQuery } from '../config/database';
import { typeValidators } from '../utils/type-utils';
import { getQuerySelects, getQueryFilters } from '../utils/sql/queries';
import { userReturnTypes, userSelect, userParameters } from '../utils/sql/user.query';

export const select = async ({ selects = userReturnTypes.middle, filters = {} }) => {
    try {
        const query = `
            SELECT ${getQuerySelects(selects, userSelect)}
            FROM user
            ${getQueryFilters(filters, userParameters)}
        `;

        const response = await runQuery(query);

        const users = response.map((user) => new UserApi(user));
        return users;
    } catch (error) {
        throw error;
    }
};

export const selectById = async (id) => {
    if (!typeValidators(id, 'number')) throw new Error('Param {id} is invalid');

    try {
        const query = `
            SELECT ${getQuerySelects(selects, userSelect)}
            FROM user
            ${getQueryFilters({ id }, userParameters)}
        `;

        const response = await runQuery(query);
        if (response?.length === 0) return {};

        const user = new UserApi(response[0]);
        return user;
    } catch (error) {
        throw error;
    }
};

export const insert = async (user) => {
    try {
        const newuser = new UserDataBase(user);

        const query = ` INSERT INTO user SET ?`;

        const response = await runQuery(query, newuser.getNonNullFields());

        return { id: response.insertId };
    } catch (error) {
        throw error;
    }
};

export const update = async (id, user) => {
    if (!typeValidators(id, 'number')) throw new Error('Param {id} is invalid');

    try {
        const newuser = new UserDataBase({ ...user, updatedAt: new Date() });

        const query = `
            UPDATE user
            SET ?
            WHERE id = ${id}
        `;

        const response = await runQuery(query, newuser.getNonNullFields());

        return response === 0 ? null : {};
    } catch (error) {
        throw error;
    }
};

export const remove = async (id) => {
    if (!typeValidators(id, 'number')) throw new Error('Param {id} is invalid');

    try {
        const query = `DELETE FROM user WHERE id = ${id}`;

        const response = await runQuery(query);

        return response === 0 ? null : {};
    } catch (error) {
        throw error;
    }
};

export default {
    select,
    selectById,
    insert,
    update,
    remove,
};
