import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../../utils/errors';
import { User } from '../../models/user';
import { ErrorResponses } from '../../configs/constants';
import { Role } from '../../models/roles';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse(ErrorResponses.unathorized, 401));
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new ErrorResponse(ErrorResponses.unathorized, 401));
  }
  const responseUser = await User.findByPk(decoded.id, { include: [{ model: Role }] });
  if (!responseUser) {
    return next(new ErrorResponse(ErrorResponses.loginError, 400));
  }
  const user = responseUser.get({ plain: true });
  req.user = { ...user, role: user.role.role_name };
  next();
});
