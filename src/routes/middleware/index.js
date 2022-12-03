const { keys, ResponseMessages } = require('../../common');
const { CustomError, parseJoiObject } = require('../../utils');


module.exports.validationMiddleware = (validationObject, isGet = false) => (req, res, next) => {
  req.apiParams = parseJoiObject(validationObject);
  const body = isGet ? req.query || {} : req.body || {};
  const { error } = validationObject ? validationObject.validate(body) : '';
  if (error) {
    console.log(error)
    return next(new CustomError(ResponseMessages.JOI_VALIDATION_ERROR));
  }
  return next();
};

