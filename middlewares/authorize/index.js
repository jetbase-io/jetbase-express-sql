import ErrorResponse from '../../utils/errors';
import { ErrorResponses } from '../../configs/constants';

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ErrorResponse(ErrorResponses.notPermission(roles), 403));
  }
  next();
};
