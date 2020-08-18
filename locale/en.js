export const Messages = {
  errors: {
    auth: {
      login: {
        message: 'Invalid email/password supplied.',
        key: 'auth.login.error',
      },
      unathorized: {
        message: 'User need to log in first.',
        key: 'auth.unathorized.error',
      },
      permission: {
        message: 'Permission denied for this action.',
        key: 'auth.permission.error',
      },
    },
    user: {
      password: {
        length: {
          message: 'Invalid password length',
          key: 'user.password.length.error',
        },
        empty: {
          message: 'Password is required',
          key: 'user.password.empty.error',
        },
        not_match_with_confirmation: {
          message: 'Password not a match with Password confirmation',
          key: 'user.password.not_match_with_confirmation.error',
        },
        not_match_with_old: {
          message: 'Password not a match with old password',
          key: 'user.password.not_match_with_old.error',
        },
      },
      not_found: {
        message: 'User not found',
        key: 'user.not_found.error',
      },
      old_password: {
        empty: {
          message: 'Old password is required',
          key: 'user.old_password.empty.error',
        },
      },
      new_password: {
        length: {
          message: 'Invalid new password length',
          key: 'user.new_password.length.error',
        },
      },
      first_name: {
        length: {
          message: 'Invalid first Name length',
          key: 'user.first_name.length.error',
        },
        empty: {
          message: 'First name is require',
          key: 'user.last_name.empty.error',
        },
      },
      last_name: {
        length: {
          message: 'Invalid last name length',
          key: 'user.last_name.length.error',
        },
        empty: {
          message: 'Last name is require',
          key: 'user.last_name.empty.error',
        },
      },
      email: {
        type: {
          message: 'Invalid email type',
          key: 'user.email.type.error',
        },
        empty: {
          message: 'Email field is require',
          key: 'user.email.empty.error',
        },
        exists: {
          message: 'This email has already exist',
          key: 'user.email.exists.error',
        },
      },
    },
  },
  success: {
    user: {
      delete: { message: 'User successfully deleted.' },
      updateField: { message: 'Updated user successfully.' },
      updatePassword: { message: 'Updated password successfully' },
    },
  },
};
