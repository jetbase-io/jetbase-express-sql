import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../../utils/errors';
import { User } from '../../models/user';
import { Messages } from '../../locale/en';
import { Role } from '../../models/roles';

const {
  errors: {
    auth: { unathorized, login },
  },
} = Messages;

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse(unathorized.message, 401, 'default', unathorized.key));
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new ErrorResponse(unathorized.message, 401, 'default', unathorized.key));
  }
  const responseUser = await User.findByPk(decoded.id, { include: [{ model: Role }] });
  if (!responseUser) {
    return next(new ErrorResponse(login.message, 400, 'default', login.key));
  }
  const user = responseUser.get({ plain: true });
  req.user = { ...user, role: user.role.role_name };
  next();
});
