import dotenv from 'dotenv';

dotenv.config();

export const { DB_USER_DEV } = process.env;
export const { DB_PASSWORD_DEV } = process.env;
export const { DB_NAME_DEV } = process.env;

export const { DB_NAME_TEST } = process.env;
export const { DB_PASSWORD_TEST } = process.env;
export const { DB_USER_TEST } = process.env;

export const { PORT } = process.env;

export const JWT_EXPIRES = +process.env.JWT_EXPIRES;
export const { JWT_SECRET } = process.env;

export const Validation = {
  passwordLength: 6,
  lastNameLength: 2,
  firstNameLength: 2,
};
