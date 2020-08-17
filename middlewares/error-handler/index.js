import { ErrorResponses } from '../../configs/constants';
import { generateFormError } from '../../utils/errors';

/* eslint-disable no-unused-vars */
export const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  if (process.env.NODE_ENV !== 'test') {
    console.log(err);
  }
  error.message = err.message;

  let errorObject;

  if (error.errorType !== 'formError' || error.statusCode === 500) {
    errorObject = {
      error_key: 'en',
      message: error.statusCode !== 500 ? error.message : ErrorResponses.serverError,
    };
  } else {
    const form_errors = generateFormError(error);
    errorObject = {
      message: '',
      error_object: {},
      error_key: 'en',
      form_errors,
    };
  }

  res.status(error.statusCode || 500).json(errorObject);
};
