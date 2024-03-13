import * as md5 from 'md5';
const key = 'siodjbfihjbasdiougfasodfds';

export const encrypt = (value: string) => md5(value + key);
