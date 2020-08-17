import { check, validationResult } from 'express-validator';
import ErrorResponse from '../../../utils/errors';
import { ErrorResponses, Validation } from '../../../configs/constants';

export const createUserPayload = [
  check('email', ErrorResponses.isRequire('Email')).not().isEmpty().isEmail().withMessage(ErrorResponses.invalidEmail),
  check('password', ErrorResponses.isRequire('Password'))
    .not()
    .isEmpty()
    .isLength({ min: Validation.passwordLength })
    .withMessage(ErrorResponses.invalidMinLength),
  check('first_name', ErrorResponses.isRequire('First name'))
    .not()
    .isEmpty()
    .isLength({ min: Validation.firstNameLength })
    .withMessage(ErrorResponses.invalidMinLength),
  check('last_name', ErrorResponses.isRequire('Last name'))
    .not()
    .isEmpty()
    .isLength({ min: Validation.lastNameLength })
    .withMessage(ErrorResponses.invalidMinLength),
];

export const updateUserPayload = [
  check('email').optional().isEmail().withMessage(ErrorResponses.invalidEmail),
  check('first_name')
    .optional()
    .isLength({ min: Validation.firstNameLength })
    .withMessage(ErrorResponses.invalidMinLength),
  check('last_name', ErrorResponses.isRequire('Last name'))
    .optional()
    .isLength({ min: Validation.lastNameLength })
    .withMessage(ErrorResponses.invalidMinLength),
];

export const updatePasswordPayload = [
  check('new_password')
    .optional()
    .isLength({ min: Validation.passwordLength })
    .withMessage(ErrorResponses.invalidMinLength),
];

export const checkUsersValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObjects = errors.array();
    return next(new ErrorResponse(JSON.stringify(errorObjects), 400, 'formError'));
  }
  next();
};
