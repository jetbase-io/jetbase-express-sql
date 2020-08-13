import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import ErrorResponse from '../utils/errors';
import { ErrorResponses } from '../configs/constants';
import { bcryptHash } from '../utils/bcrypt';
import { findAllUsersQuery } from '../utils/db';

export const getRegisteredUsers = asyncHandler(async (req, res, next) => {
  const { email, limit, offset } = req.query;
  const query = findAllUsersQuery({ email, limit, offset });
  const users = await User.findAll(query);
  res.json({ items: users, count: users.length });
});

export const createUser = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, email, password, password_confirmation, role_id } = req.body;
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    return next(new ErrorResponse(ErrorResponses.emailExist, 400));
  }
  if (password !== password_confirmation) {
    return next(new ErrorResponse(ErrorResponses.notMatchPasswords, 400));
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

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const { roleId: role_id, email, id, first_name, last_name } = req.user;
  res.json({ id, role_id, email, first_name, last_name });
});

export const getUserById = asyncHandler(async (req, res, next) => {
  const { id, first_name, last_name, roleId: role_id, email } = req.responseUser;
  res.json({ id, email, last_name, first_name, role_id });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  if (req.user.roleId === 2) {
    req.body.role_id = undefined;
  }
  if (req.user.roleId === 2 && req.responseUser.id !== req.user.id) {
    return next(new ErrorResponse(ErrorResponses.updatePermission, 403));
  }
  const { last_name, first_name, email, role_id: roleId } = req.body;
  if (email) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(new ErrorResponse(ErrorResponses.emailExist, 400));
    }
  }
  await User.update({ last_name, first_name, email, roleId }, { where: { id: req.responseUser.id } });
  res.json({ success: true });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  await req.responseUser.destroy();
  res.json({ success: true });
});

export const updateUserPassword = asyncHandler(async (req, res, next) => {
  const { old_password, new_password } = req.body;
  if (req.user.roleId === 1) {
    const password = await bcryptHash(new_password);
    await User.update({ password }, { where: { id: req.responseUser.id } });
  } else {
    if (!old_password) {
      return next(new ErrorResponse(ErrorResponses.oldPasswordEmpty, 400));
    }
    if (req.user.id !== req.responseUser.id) {
      return next(new ErrorResponse(ErrorResponses.updatePasswordPermission, 403));
    }
    const compare = await bcrypt.compare(old_password, req.responseUser.password);
    if (!compare) {
      return next(new ErrorResponse(ErrorResponses.loginError, 400));
    }
  }
  res.json({ message: 'Updated password successfully.' });
});
