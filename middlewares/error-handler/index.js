import { generateFormError } from '../../utils/errors';

/* eslint-disable no-unused-vars */
export const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  if (process.env.NODE_ENV !== 'test') {
    console.log(err);
  }
  error.message = err.message;

  let errorObject;

  if (error.errorType !== 'formError') {
    errorObject = {
      error_key: error.error_key,
      message: error.statusCode && error.statusCode !== 500 ? error.message : 'Unexpected internal errors.',
    };
  } else {
    const form_errors = generateFormError(error);
    errorObject = {
      message: '',
      error_object: {},
      error_key: '',
      form_errors,
    };

    if (!errorObject.message) {
      delete errorObject.message;
      delete errorObject.error_key;
    }
    if (!Object.keys(errorObject.error_object).length) delete errorObject.error_object;
  }

  res.status(error.statusCode || 500).json(errorObject);
};
