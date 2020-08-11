import asyncHandler from 'express-async-handler';
import { User } from '../models/user';

export const getRegisteredUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll({ attributes: ['id', 'first_name', 'last_name', 'email', ['roleId', 'role_id']] });
  res.json({ items: users, count: users.length });
});
