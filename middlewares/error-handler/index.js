import { ErrorResponses } from '../../configs/constants';

/* eslint-disable no-unused-vars */
export const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  if (process.env.NODE_ENV !== 'test') {
    console.log(err);
  }
  error.message = err.message;
  res.status(error.statusCode || 500).json({ errors: { message: error.message || ErrorResponses.serverError } });
};
