const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "فیلد دانشگاه نمی‌تواند خالی باشد";
  }

  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "فیلد رشته نمی‌تواند خالی باشد";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "فیلد مدرک نمی‌تواند خالی باشد";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "فیلد تاریخ شروع نمی‌تواند خالی باشد";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
