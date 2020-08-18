import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import ErrorResponse from '../utils/errors';
import { Messages } from '../locale/en';
import { bcryptHash } from '../utils/bcrypt';
import { findAllUsersQuery } from '../utils/db';

const {
  errors: {
    user: { email: emailError, password: passwordError, old_password: oldPasswordError },
    auth: { permission: permissionError, login: loginError },
  },
  success: {
    user: { delete: deleteSuccess, updatePassword: updatePasswordSuccess, updateField: updateFieldSuccess },
  },
} = Messages;

export const getRegisteredUsers = asyncHandler(async (req, res) => {
  const { email, limit, offset } = req.query;
  const query = findAllUsersQuery({ email, limit, offset });
  const users = await User.findAll(query);
  res.json({ items: users, count: users.length });
});

export const createUser = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, email, password, password_confirmation, role_id } = req.body;
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    return next(new ErrorResponse(emailError.exists.message, 400, 'default', emailError.exists.key));
  }
  if (password !== password_confirmation) {
    return next(
      new ErrorResponse(
        passwordError.not_match_with_confirmation.message,
        400,
        'default',
        passwordError.not_match_with_confirmation.key
      )
    );
  }
  const hashedPassword = await bcryptHash(password);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    first_name,
    last_name,
    roleId: role_id || 2,
  });
  res.json({ id: newUser.id });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const { roleId: role_id, email, id, first_name, last_name } = req.user;
  res.json({
    id,
    role_id,
    email,
    first_name,
    last_name,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id, first_name, last_name, roleId: role_id, email } = req.responseUser;
  res.json({
    id,
    email,
    last_name,
    first_name,
    role_id,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  if (req.user.roleId === 2) {
    req.body.role_id = undefined;
  }
  if (req.user.roleId === 2 && req.responseUser.id !== req.user.id) {
    return next(new ErrorResponse(permissionError.message, 403, 'default', permissionError.key));
  }
  const { last_name, first_name, email, role_id: roleId } = req.body;
  if (email) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(new ErrorResponse(emailError.exists.message, 400, 'default', emailError.exists.key));
    }
  }
  await User.update(
    {
      last_name,
      first_name,
      email,
      roleId,
    },
    { where: { id: req.responseUser.id } }
  );
  res.json({ message: updateFieldSuccess.message });
});

export const deleteUser = asyncHandler(async (req, res) => {
  await req.responseUser.destroy();
  res.json({ message: deleteSuccess.message });
});

export const updateUserPassword = asyncHandler(async (req, res, next) => {
  const { old_password, new_password } = req.body;
  if (req.user.roleId === 1) {
    const password = await bcryptHash(new_password);
    await User.update({ password }, { where: { id: req.responseUser.id } });
  } else {
    if (!old_password) {
      return next(new ErrorResponse(oldPasswordError.empty.message, 400, 'default', oldPasswordError.empty.key));
    }
    if (req.user.id !== req.responseUser.id) {
      return next(new ErrorResponse(permissionError.message, 403, 'default', permissionError.key));
    }
    const compare = await bcrypt.compare(old_password, req.responseUser.password);
    if (!compare) {
      return next(new ErrorResponse(loginError.message, 400, 'default', loginError.key));
    }
  }
  res.json({ message: updatePasswordSuccess.message });
});
