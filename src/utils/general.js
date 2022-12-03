/* eslint-disable max-len */
const bcrypt = require('bcrypt');

const saltRounds = 10;

const getPrefixofModel = (modeName = '') => {
  const split = modeName.split('-');
  if (split.length > 1) {
    return split[0][0] + split[1][0];
  }

  return modeName.substring(0, 2);
};

module.exports.encryptPassword = (password) => new Promise((resolve, reject) => {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) { return reject(err); }
    return resolve(hash);
  });
});

module.exports.comparePassword = (password, hash) => new Promise((resolve, reject) => {
  bcrypt.compare(password, hash, (err, res) => {
    if (err) { return reject(err); }
    return resolve(res);
  });
});

module.exports.ApiResponse = (res, status, resObj, result) => res.status(resObj.code || 200).json({ status, message: resObj.message, result });


module.exports.generateReferenceForModel = (len, modelName) => {
  const prefix = getPrefixofModel(modelName);
  let initialValue1 = '1';
  let initialValue2 = '9';
  for (let index = 1; index < len - 2; index++) {
    initialValue1 += '0';
    initialValue2 += '0';
  }
  return `${prefix.toUpperCase()}${Math.floor(parseInt(initialValue1, 10) + Math.random() * parseInt(initialValue2, 10))}`;
};


const parseJoiObject = (validationObject) => {
  const keysArr = [];
  const entries = validationObject._inner.children.entries();
  function logMapElements(value) {
    keysArr.push({
      key: value.key,
      type: value.schema._type,
      valids: value.schema._valids ? Array.from(value.schema._valids._set) : null, // for now only to make it work
      flags: value.schema._flags,
    });
  }
  new Map(entries)
    .forEach(logMapElements);
  return keysArr;
};

module.exports.parseJoiObject = (validationObject) => {
  const keysArr = [];
  const entries = (validationObject && validationObject._inner.children && validationObject._inner.children.entries()) || [];
  function logMapElements(value) {
    keysArr.push({
      key: value.key,
      //type: (value.schema._inner && value.schema._inner.items) ? parseJoiObject(value.schema._inner.items[0]) : value.schema._type,
      valids: value.schema._valids ? Array.from(value.schema._valids._set) : null, // for now only to make it work
      flags: value.schema._flags,
    });
  }
  new Map(entries).forEach(logMapElements);
  return keysArr;
};