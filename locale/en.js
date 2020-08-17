export const Messages = {
  loginError: 'Invalid email/password supplied.',
  serverError: 'Unexpected internal errors.',
  unathorized: 'User need to log in first.',
  notPermission: 'Permission denied for this action.',
  emailExist: 'This email has already exist.',
  notMatchPasswords: 'Password and password confirmation do not match',
  isRequire: name => `${name} is require`,
  userNotFound: 'User not found',
  invalidEmail: 'Invalid email type',
  updatePermission: 'Not permission for update this user.',
  updatePasswordPermission:
    'The caller does not have permission to update the password of the user with given ID, or the old password in request body is not correct',
  oldPasswordEmpty: 'Old password is blank;',
  invalidMinLength: 'Invalid min length',
};
