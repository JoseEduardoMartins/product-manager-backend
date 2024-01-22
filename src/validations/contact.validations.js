import { check, body } from 'express-validator';
import { number, contactId } from './phone.validations';

const id = () =>
    check('id')
        .isInt()
        .withMessage('ID must be number.')
        .exists()
        .withMessage("ID can't be undefined.")
        .notEmpty()
        .withMessage("ID can't be null.")
        .toInt();

const name = () =>
    check('name')
        .isString()
        .withMessage('NAME must be string.')
        .exists()
        .withMessage("NAME can't be undefined.")
        .notEmpty()
        .withMessage("NAME can't be null.")
        .bail()
        .isLength({ max: 300 })
        .withMessage("NAME can't be too large.")
        .trim();

const age = () =>
    check('age')
        .isInt()
        .withMessage('AGE must be number.')
        .exists()
        .withMessage("AGE can't be undefined.")
        .notEmpty()
        .withMessage("AGE can't be null.")
        .toInt();

const phones = () =>
    body('phones')
        .isArray()
        .withMessage('PHONES must be list.')
        .exists()
        .withMessage("PHONES can't be undefined.")
        .notEmpty()
        .withMessage("PHONES can't be null.")
        .toArray()
        .custom((value, { req }) => number('phones.*.number').run(req));

const GET = {
    id,
    name,
    age,
};

const POST = {
    name,
    age,
    phones,
};

const PUT = {
    id,
    name,
    age,
    phones,
};

const DELETE = {
    id,
};

export const validators = { GET, POST, PUT, DELETE };

export const requireValidators = ['name', 'login', 'password'];

export default { validators, requireValidators };
