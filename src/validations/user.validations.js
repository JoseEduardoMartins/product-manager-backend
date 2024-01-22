import { check } from 'express-validator';
import { select } from '../repositories/contact.repository';

const id = () =>
    check('id')
        .isInt()
        .withMessage('ID must be number.')
        .exists()
        .withMessage("ID can't be undefined.")
        .notEmpty()
        .withMessage("ID can't be null.")
        .toInt();

const name = () => check('name').isString().withMessage('');

const birthdate = () => check('birthdate').isString().withMessage('');

const phone = () => check('phone').isString().withMessage('');

const taxId = () => check('taxId').isString().withMessage('');

const email = () => check('email').isString().withMessage('');

const password = () => check('password').isString().withMessage('');

const photo = () => check('photo').isString().withMessage('');

const isActive = () => check('isActive').isString().withMessage('');

const isVerified = () => check('isVerified').isString().withMessage('');

const isDeleted = () => check('isDeleted').isString().withMessage('');

const createdAt = () => check('createdAt').isString().withMessage('');

const updatedAt = () => check('updatedAt').isString().withMessage('');

const deletedAt = () => check('deletedAt').isString().withMessage('');

const addressId = () => check('addressId').isString().withMessage('');

const GET = {
    id,
};

const POST = {};

const PUT = {
    id,
};

const DELETE = {
    id,
};

export const validators = { GET, POST, PUT, DELETE };

export const requireValidators = ['name', 'login', 'password'];

export default { validators, requireValidators };
