import asyncHandler from 'express-async-handler';
import { User } from '../../models/user';
import ErrorResponse from '../../utils/errors';
import { Messages } from '../../locale/en';

const {
  errors: {
    user: { not_found: notFoundError },
  },
} = Messages;

export const getUserByIdMdw = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  const responseUser = await User.findByPk(user_id);
  if (!responseUser) {
    return next(new ErrorResponse(notFoundError.message, 404, 'default', notFoundError.key));
  }
  req.responseUser = responseUser;
  next();
});
