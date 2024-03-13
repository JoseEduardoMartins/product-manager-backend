import * as jwt from 'jsonwebtoken';
const key = 'siodjbfihjbasdiougfasodfds';

export const generateToken = ({ name, email, password }) =>
  jwt.sign({ name, email, password }, key);

export const decodeToken = (token) => jwt.verify(token, key);
