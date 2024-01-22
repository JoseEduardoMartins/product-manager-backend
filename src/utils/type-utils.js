const validators = {
    number: (value) => Number.isInteger(value),
    string: (value) => value.toString(),
    boolean: (value) => value === false || value === true || value === 1 || value === 0,
    date: (value) => value instanceof Date && !isNaN(value),
};

export const typeValidators = (value, type) => validators[type](value);

export default {
    typeValidators,
};
