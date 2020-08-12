import dotenv from 'dotenv';
import { getPermissionRoles } from '../../utils/roles';

dotenv.config();

export const DB_USER_DEV = process.env.DB_USER_DEV;
export const DB_PASSWORD_DEV = process.env.DB_PASSWORD_DEV;
export const DB_NAME_DEV = process.env.DB_NAME_DEV;

export const DB_NAME_TEST = process.env.DB_NAME_TEST;
export const DB_PASSWORD_TEST = process.env.DB_PASSWORD_TEST;
export const DB_USER_TEST = process.env.DB_USER_TEST;

export const PORT = process.env.PORT;

export const JWT_EXPIRES = +process.env.JWT_EXPIRES;
export const JWT_SECRET = process.env.JWT_SECRET;

export const ErrorResponses = {
  loginError: 'Invalid email/password supplied.',
  serverError: 'Unexpected internal errors.',
  unathorized: 'User need to log in first.',
  notPermission: (roles) => `User does not have permission of ${getPermissionRoles(roles)} role.`,
  emailExist: 'This email has already exist.',
  notMatchPasswords: 'Password and password confirmation do not match',
  isRequire: (name) => `${name} is require`,
  userNotFound: 'User not found',
};
