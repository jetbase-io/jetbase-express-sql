import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../../utils/errors';
import { User } from '../../models/user';
import { ErrorResponses } from '../../configs/constants';

export const protected = asyncHandler(async (req, res, next) => {
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
    req.user = responseUser.get({ plain: true });
    next();
  } catch (error) {
    return next(new ErrorResponse(ErrorResponses.unathorized, 401));
  }
});
