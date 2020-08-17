class ErrorResponse extends Error {
  constructor(message, statusCode, errorType = 'default') {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
  }
}

export default ErrorResponse;

export const generateFormError = (stringError = '') => {
  const parseError = JSON.parse(stringError.message);
  const form_errors = [];
  parseError.forEach((errorItem) => {
    const candidate = form_errors.find(item => errorItem.param === item.field_name);

    if (candidate) {
      candidate.field_errors.push({ message: errorItem.msg, error_key: '', error_object: {} });
    } else {
      const obj = {};
      obj.field_name = errorItem.param;
      obj.field_errors = [];
      obj.field_errors.push({ message: errorItem.msg, error_key: '', error_object: {} });
      form_errors.push(obj);
    }
  });

  return form_errors;
};
