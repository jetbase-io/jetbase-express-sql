import dotenv from 'dotenv';

dotenv.config();

export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const PORT = process.env.PORT;
export const JWT_EXPIRES = +process.env.JWT_EXPIRES;
export const JWT_SECRET = process.env.JWT_SECRET;

export const ErrorResponses = {
  loginError: 'Invalid email/password supplied',
  serverError: 'Unexpected internal errors',
};
