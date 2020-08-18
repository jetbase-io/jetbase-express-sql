import { Messages } from '../../locale/en';

class ErrorResponse extends Error {
  constructor(message, statusCode, errorType = 'default', error_key = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.error_key = error_key;
  }
}

export default ErrorResponse;

export const generateFormError = (stringError = '', error_object = {}) => {
  const parseError = JSON.parse(stringError.message);
  const form_errors = [];
  parseError.forEach(errorItem => {
    const candidate = form_errors.find(item => errorItem.param === item.field_name);
    if (candidate) {
      let errObject = error_object;
      if (!Object.keys(errObject).length) {
        errObject = undefined;
      }
      candidate.field_errors.push({ message: errorItem.msg, error_key: errorItem.error_key, error_object: errObject });
    } else {
      const obj = {};
      obj.field_name = errorItem.param;
      obj.field_errors = [];
      let errObject = error_object;
      if (!Object.keys(errObject).length) {
        errObject = undefined;
      }
      obj.field_errors.push({ message: errorItem.msg, error_key: errorItem.error_key, error_object: errObject });
      form_errors.push(obj);
    }
  });

  return form_errors;
};

export const generateErrorResultFromValidator = (errorObjects, errorKey) => {
  const errorResult = errorObjects.map(errorItem => {
    const candidate = Object.keys(Messages.errors[errorKey][errorItem.param]).find(
      item => Messages.errors[errorKey][errorItem.param][item].message === errorItem.msg
    );

    const result = {
      ...errorItem,
      error_key: Messages.errors[errorKey][errorItem.param][candidate].key,
    };
    return result;
  });
  return errorResult;
};
