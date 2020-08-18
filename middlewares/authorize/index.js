import ErrorResponse from '../../utils/errors';
import { Messages } from '../../locale/en';

const {
  errors: {
    auth: { permission },
  },
} = Messages;

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ErrorResponse(permission.message, 403, 'default', permission.key));
  }
  next();
};
