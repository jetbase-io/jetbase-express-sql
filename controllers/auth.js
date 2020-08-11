import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

import { User } from '../models/user';
import ErrorResponse from '../utils/errors';
import { ErrorResponses, JWT_EXPIRES } from '../configs/constants';
import { Role } from '../models/roles';
import { jwtSign } from '../utils/jwt';

export const login = asyncHandler(async (req, res, next) => {
  const { email: emailBody, password } = req.body;
  const responseUser = await User.findOne({ where: { email: emailBody } });
  if (!responseUser) {
    return next(new ErrorResponse(ErrorResponses.loginError, 400));
  }
  const user = responseUser.get({ plain: true });
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return next(new ErrorResponse(ErrorResponses.loginError, 400));
  }
  const responseRole = await Role.findByPk(user.roleId);
  if (!responseRole) {
    return next(new ErrorResponse(ErrorResponses.loginError, 400));
  }
  const role = responseRole.get({ plain: true });
  const { id, email } = user;
  const jwtPayload = { id, email, role: role.role_name };
  const token = jwtSign(jwtPayload);
  const now = new Date().getTime();
  const expires_after = new Date(now + JWT_EXPIRES * 10);
  res.json({ token, rate_limit: JWT_EXPIRES, expires_after });
});
