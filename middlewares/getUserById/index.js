import asyncHandler from 'express-async-handler';
import { User } from '../../models/user';
import ErrorResponse from '../../utils/errors';
import { ErrorResponses } from '../../configs/constants';

export const getUserByIdMdw = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  const responseUser = await User.findByPk(user_id);
  if (!responseUser) {
    return next(new ErrorResponse(ErrorResponses.userNotFound, 404));
  }
  const user = responseUser.get({ plain: true });
  req.responseUser = user;
  next();
});
