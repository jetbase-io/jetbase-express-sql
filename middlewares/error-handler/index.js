import { ErrorResponses } from '../../configs/constants';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  console.log(err);
  error.message = err.message;
  res.status(error.statusCode || 500).json({ errors: { message: error.message || ErrorResponses.serverError } });
};
