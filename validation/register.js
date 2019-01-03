const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "طول نام باید بین ۲ تا ۳۰ کاراکتر باشد";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "فیلد نام نمی‌تواند خالی باشد";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "ایمیل نا معتبر";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "فیلد ایمیل نمی‌تواند خالی باشد";
  }

  if (!validator.isLength(data.password, { min: 8, max: 35 })) {
    errors.password = "طول پسوورد باید بین ۸ تا ۳۵ کاراکتر باشد";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "فیلد پسوورد نمی‌تواند خالی باشد";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password = "پسووردها یکسان نیستند";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "فیلد تایید پسوورد نمی‌تواند خالی باشد";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
