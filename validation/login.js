const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.password)) {
    errors.password = "فیلد پسوورد نمی‌تواند خالی باشد";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "ایمیل نا معتبر است";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "فیلد ایمیل نمی‌تواند خالی باشد";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
