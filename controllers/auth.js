import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

import { User } from '../models/user';
import ErrorResponse from '../utils/errors';
import { JWT_EXPIRES } from '../configs/constants';
import { Role } from '../models/roles';
import { jwtSign } from '../utils/jwt';
import { Messages } from '../locale/en';

const {
  errors: {
    auth: { login: loginError },
  },
} = Messages;

export const login = asyncHandler(async (req, res, next) => {
  const { email: emailBody, password } = req.body;
  const responseUser = await User.findOne({ where: { email: emailBody }, include: [{ model: Role }] });
  if (!responseUser) {
    return next(new ErrorResponse(loginError.message, 400, 'default', loginError.key));
  }
  const user = responseUser.get({ plain: true });
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return next(new ErrorResponse(loginError.message, 400, 'default', loginError.key));
  }
  const { id, email, role } = user;
  const jwtPayload = { id, email, role: role.role_name };
  const token = jwtSign(jwtPayload);
  const now = new Date().getTime();
  const expires_after = new Date(now + JWT_EXPIRES * 10);
  res.json({ token, rate_limit: JWT_EXPIRES, expires_after });
});
