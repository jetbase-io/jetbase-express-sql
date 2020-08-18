import { check, validationResult } from 'express-validator';
import ErrorResponse, { generateErrorResultFromValidator } from '../../../utils/errors';
import { Validation } from '../../../configs/constants';
import { Messages } from '../../../locale/en';

const {
  errors: {
    user: { password, first_name, last_name, email, new_password },
  },
} = Messages;

export const createUserPayload = [
  check('email', email.empty.message).not().isEmpty().isEmail().withMessage(email.type.message),
  check('password', password.empty.message)
    .not()
    .isEmpty()
    .isLength({ min: Validation.passwordLength })
    .withMessage(password.length.message),
  check('first_name', first_name.empty.message)
    .not()
    .isEmpty()
    .isLength({ min: Validation.firstNameLength })
    .withMessage(first_name.length.message),
  check('last_name', last_name.empty.message)
    .not()
    .isEmpty()
    .isLength({ min: Validation.lastNameLength })
    .withMessage(last_name.length.message),
];

export const updateUserPayload = [
  check('email').optional().isEmail().withMessage(email.type.message),
  check('first_name').optional().isLength({ min: Validation.firstNameLength }).withMessage(first_name.length.message),
  check('last_name').optional().isLength({ min: Validation.lastNameLength }).withMessage(last_name.length.message),
];

export const updatePasswordPayload = [
  check('new_password')
    .optional()
    .isLength({ min: Validation.passwordLength })
    .withMessage(new_password.length.message),
];

export const checkUsersValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObjects = errors.array();
    const errorResult = generateErrorResultFromValidator(errorObjects, 'user');
    return next(new ErrorResponse(JSON.stringify(errorResult), 400, 'formError'));
  }
  next();
};
