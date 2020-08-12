import dotenv from 'dotenv';
import { getPermissionRoles } from '../../utils/roles';

dotenv.config();

export const DB_USER_DEV = process.env.DB_USER_DEV;
export const DB_PASSWORD_DEV = process.env.DB_PASSWORD_DEV;
export const DB_NAME_DEV = process.env.DB_NAME_DEV;
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
  invalidEmail: 'Invalid email type',
  updatePermission: 'Not permission for update this user.',
  updatePasswordPermission:
    'The caller does not have permission to update the password of the user with given ID, or the old password in request body is not correct',
  oldPasswordEmpty: 'Old password is blank;',
};
