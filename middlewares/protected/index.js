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
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const responseUser = await User.findByPk(decoded.id);
    if (!responseUser) {
      return next(new ErrorResponse(ErrorResponses.unathorized, 401));
    }
    const user = responseUser.get({ plain: true });
    const responseRole = await Role.findByPk(user.roleId);
    if (!responseRole) {
      return next(new ErrorResponse(ErrorResponses.unathorized, 401));
    }
    const role = responseRole.get({ plain: true });
    req.user = { ...user, role: role.role_name };
    next();
  } catch (error) {
    return next(new ErrorResponse(ErrorResponses.unathorized, 401));
  }
});
