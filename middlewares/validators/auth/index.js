import { check, validationResult } from 'express-validator';
import ErrorResponse from '../../../utils/errors';
import { Messages } from '../../../locale/en';

const {
  errors: {
    auth: { login: loginError },
  },
} = Messages;

export const loginPayload = [
  check('email', loginError.message).not().isEmpty().isEmail(),
  check('password', loginError.message).not().isEmpty(),
];

export const checkLoginValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map(err => err.msg)[0];
    return next(new ErrorResponse(msg, 400, 'default', loginError.key));
  }
  next();
};
