import { runQuery } from '../config/database';
import { getQuerySelects, getQueryFilters } from '../utils/sql/queries';

export default class Repository {
    data;
    entityName;
    entitySelects;
    entityParameters;

    constructor({ data, entityName, entitySelects, entityParameters }) {
        this.data = data;
        this.entityName = entityName;
        this.entitySelects = entitySelects;
        this.entityParameters = entityParameters;
    }

    async select({ selects, filters }) {
        try {
            const query = `
                SELECT ${getQuerySelects(selects, this.entitySelects)}
                FROM ${this.entityName}
                ${getQueryFilters(filters, this.entityParameters)}
            `;

            return await runQuery(query);
        } catch (error) {
            throw error;
        }
    }

    async insert() {
        try {
            const query = `
                INSERT INTO ${this.entityName}
                SET ?
            `;

            return await runQuery(query, data);
        } catch (error) {
            throw error;
        }
    }

    async update({ filters }) {
        try {
            const query = `
                UPDATE ${this.entityName}
                SET ?
                ${getQueryFilters(filters, this.entityParameters)}
            `;

            return await runQuery(query, data);
        } catch (error) {
            throw error;
        }
    }

    async remove({ filters }) {
        try {
            const query = `
                DELETE FROM ${this.entityName}
                ${getQueryFilters(filters, this.entityParameters)}
            `;

            return await runQuery(query);
        } catch (error) {
            throw error;
        }
    }
}
