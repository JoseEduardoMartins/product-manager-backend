import { validationResult } from 'express-validator';

export const methodFields = {
    GET: ({ params, query }) => [...Object.keys(params), ...Object.keys(query)],
    POST: ({ body }) => Object.keys(body),
    PUT: ({ params, body }) => [...Object.keys(params), ...Object.keys(body)],
    DELETE: ({ params, query }) => [...Object.keys(params), ...Object.keys(query)],
};

export const validateFields = (requireFields, validators) => async (req, res, next) => {
    const fields = [...requireFields];
    const validator = { ...validators[req.method] };

    const fieldsByMethod = methodFields[req.method](req);

    fieldsByMethod.forEach((element) => fields.indexOf(element) === -1 && fields.push(element));

    await Promise.all(fields.map((element) => !!validator?.[element] && validator[element]().run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};
