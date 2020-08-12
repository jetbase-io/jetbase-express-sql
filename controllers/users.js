import asyncHandler from 'express-async-handler';
import { User } from '../models/user';
import ErrorResponse from '../utils/errors';
import { ErrorResponses } from '../configs/constants';
import { bcryptHash } from '../utils/bcrypt';

export const getRegisteredUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll({ attributes: ['id', 'first_name', 'last_name', 'email', ['roleId', 'role_id']] });
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
  const { user_id } = req.params;
  const responseUser = await User.findByPk(user_id);
  if (!responseUser) {
    return next(new ErrorResponse(ErrorResponses.userNotFound, 404));
  }
  const user = responseUser.get({ plain: true });
  const { id, first_name, last_name, roleId: role_id, email } = user;
  res.json({ id, email, last_name, first_name, role_id });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  const responseUser = await User.findByPk(user_id);
  if (!responseUser) {
    return next(new ErrorResponse(ErrorResponses.userNotFound, 404));
  }
  if (req.user.roleId === 2) {
    req.body.role_id = undefined;
  }
  if (req.user.roleId === 2 && responseUser.id !== req.user.id) {
    return next(new ErrorResponse(ErrorResponses.updatePermission, 403));
  }
  const { last_name, first_name, email, role_id: roleId } = req.body;
  if (email) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(new ErrorResponse(ErrorResponses.emailExist), 400);
    }
  }
  await User.update({ last_name, first_name, email, roleId }, { where: { id: responseUser.id } });
  res.json({ success: true });
});
