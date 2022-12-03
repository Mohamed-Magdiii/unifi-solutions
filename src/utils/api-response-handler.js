

const apiResponseHandler = ({
  response, message, result, code = 200, errors = null, isSuccess = true, isError = false,
}) => {
  response.status(code).json({
    code,
    errors,
    message,
    result,
    isSuccess,
    isError,
  });
};

// eslint-disable-next-line no-unused-vars
const apiErrorHandler = (err, request, response, next) => {
  return apiResponseHandler({
    response,
    message: err.message || '',
    result: null,
    code: err.status || 500,
    // errors: [er0r],
    isSuccess: false,
    isError: true,
  });
};

module.exports = {
  apiResponseHandler,
  apiErrorHandler,
};