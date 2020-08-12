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
