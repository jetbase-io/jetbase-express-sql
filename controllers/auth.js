import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

import { User } from '../models/user';
import ErrorResponse from '../utils/errors';
import { ErrorResponses } from '../configs/constants';

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(new ErrorResponse(ErrorResponses.loginError, 400));
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return next(new ErrorResponse(ErrorResponses.loginError, 400));
  }
});
