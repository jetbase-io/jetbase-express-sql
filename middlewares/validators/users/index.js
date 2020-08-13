import { check, validationResult } from 'express-validator';
import ErrorResponse from '../../../utils/errors';
import { ErrorResponses } from '../../../configs/constants';

export const createUserPayload = [
  check('email', ErrorResponses.isRequire('Email')).not().isEmpty().isEmail(),
  check('password', ErrorResponses.isRequire('Password')).not().isEmpty(),
  check('first_name', ErrorResponses.isRequire('First name')).not().isEmpty(),
  check('last_name', ErrorResponses.isRequire('Last name')).not().isEmpty(),
  check('password_confirmation', ErrorResponses.isRequire('Password confirmation')).not().isEmpty(),
];

export const updateUserPayload = [check('email', ErrorResponses.invalidEmail).optional().isEmail()];

export const checkUsersValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map(err => err.msg)[0];
    return next(new ErrorResponse(msg, 400));
  }
  next();
};
