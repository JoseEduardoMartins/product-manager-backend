import { typeValidators } from '../type-utils';

const small = ['id', 'name', 'birthdate', 'phone', 'taxId', 'photo'];
const middle = [...small, 'email', 'password', 'addressId'];
const large = [...middle, 'isActive', 'isVerified', 'isDeleted', 'createdAt', 'updatedAt', 'deletedAt'];

export const userReturnTypes = {
    small,
    middle,
    large,
};

export const userSelect = {
    id: '"user"."id" AS id',
    name: '"user"."name" AS name',
    birthdate: '"birthdate"."birthdate" AS birthdate',
    phone: '"phone"."phone" AS phone',
    taxId: '"tax_id"."tax_id" AS taxId',
    email: '"email"."email" AS email',
    password: '"password"."password" AS password',
    photo: '"photo"."photo" AS photo',
    isActive: '"is_active"."is_active" AS isActive',
    isVerified: '"is_verified"."is_verified" AS isVerified',
    isDeleted: '"is_deleted"."is_deleted" AS isDeleted',
    createdAt: '"created_at"."created_at" AS createdAt',
    updatedAt: '"updated_at"."updated_at" AS updatedAt',
    deletedAt: '"deleted_at"."deleted_at" AS deletedAt',
    addressId: '"address_id"."address_id" AS addressId',
};

export const userParameters = {
    id: (value) => {
        if (!typeValidators(value, 'number')) throw new Error(`Filter { id: ${value} } must be a number`);
        return `id = ${value}`;
    },
    name: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { name: '${value}' } must be a string`);
        return `name LIKE '%${value}%'`;
    },
    birthdate: (value) => {
        if (!typeValidators(value, 'date')) throw new Error(`Filter { birthdate: '${value}' } must be a date`);
        return `birthdate = '${value}'`;
    },
    phone: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { phone: '${value}' } must be a string`);
        return `phone = '${value}'`;
    },
    taxId: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { taxId: '${value}' } must be a string`);
        return `tax_id = '${value}'`;
    },
    email: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { email: '${value}' } must be a string`);
        return `email = '${value}'`;
    },
    password: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { password: '${value}' } must be a string`);
        return `password = '${value}'`;
    },
    photo: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { photo: '${value}' } must be a string`);
        return `photo = '${value}'`;
    },
    isActive: (value) => {
        if (!typeValidators(value, 'boolean')) throw new Error(`Filter { isActive: ${value} } must be a boolean`);
        return `is_active = '${value}'`;
    },
    isVerified: (value) => {
        if (!typeValidators(value, 'boolean')) throw new Error(`Filter { isVerified: ${value} } must be a boolean`);
        return `is_verified = '${value}'`;
    },
    isDeleted: (value) => {
        if (!typeValidators(value, 'boolean')) throw new Error(`Filter { isDeleted: ${value} } must be a boolean`);
        return `is_deleted = '${value}'`;
    },
    createdAt: (value) => {
        if (!typeValidators(value, 'date')) throw new Error(`Filter { createdAt: '${value}' } must be a date`);
        return `created_at = '${value}'`;
    },
    updatedAt: (value) => {
        if (!typeValidators(value, 'date')) throw new Error(`Filter { updatedAt: '${value}' } must be a date`);
        return `updated_at = '${value}'`;
    },
    deletedAt: (value) => {
        if (!typeValidators(value, 'date')) throw new Error(`Filter { deletedAt: '${value}' } must be a date`);
        return `deleted_at = '${value}'`;
    },
    addressId: (value) => {
        if (!typeValidators(value, 'number')) throw new Error(`Filter { addressId: ${value} } must be a number`);
        return `address_id = ${value}`;
    },
};

export default { userReturnTypes, userSelect, userParameters };
