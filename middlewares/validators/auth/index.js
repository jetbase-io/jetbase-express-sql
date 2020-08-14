import { check, validationResult } from 'express-validator';
import ErrorResponse from '../../../utils/errors';
import { ErrorResponses } from '../../../configs/constants';

export const loginPayload = [
  check('email', ErrorResponses.loginError).not().isEmpty().isEmail(),
  check('password', ErrorResponses.loginError).not().isEmpty(),
];

export const checkLoginValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map(err => err.msg)[0];
    return next(new ErrorResponse(msg, 400));
  }
  next();
};
