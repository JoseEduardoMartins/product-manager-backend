export const getQuerySelects = (selects = [], params = {}) => {
    let query = '';

    query += selects.map((select) => {
        if (!params[select]) throw new Error(`Select {${select}} doesn’t exist`);
        return params[select];
    });

    return query;
};

export const getQueryFilters = (filters, params) => {
    if (!params) throw new Error(`Filter {} doesn’t exist`);

    let query = '';

    const elements = Object.entries(filters);

    if (elements.length > 0) query += ' WHERE ';
    else return query;

    elements.forEach((element, index) => {
        const key = element[0];
        const value = element[1];

        if (!params[key]) throw new Error(`Filter {${key}} doesn’t exist`);

        query += params[key](value);
        if (index < elements.length - 1) query += ' AND ';
    });

    return query;
};

export default {
    getQuerySelects,
    getQueryFilters,
};
