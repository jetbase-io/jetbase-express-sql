import dotenv from 'dotenv';
import { getPermissionRoles } from '../../utils/roles';

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

export const ErrorResponses = {
  loginError: 'Invalid email/password supplied.',
  serverError: 'Unexpected internal errors.',
  unathorized: 'User need to log in first.',
  notPermission: roles => `User does not have permission of ${getPermissionRoles(roles)} role.`,
  emailExist: 'This email has already exist.',
  notMatchPasswords: 'Password and password confirmation do not match',
  isRequire: name => `${name} is require`,
  userNotFound: 'User not found',
  invalidEmail: 'Invalid email type',
  updatePermission: 'Not permission for update this user.',
  updatePasswordPermission:
    'The caller does not have permission to update the password of the user with given ID, or the old password in request body is not correct',
  oldPasswordEmpty: 'Old password is blank;',
};
