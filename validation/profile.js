const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 4, max: 40 })) {
    errors.handle = "طول هندل باید بین ۴ تا ۴۰ کاراکتر باشد";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "فیلد هندل نمی‌تواند خالی باشد";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "فیلد وضعیت نمی‌تواند خالی باشد";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "فیلد مهارت‌ها نمی‌تواند خالی باشد";
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "آدرس نا معتبر";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "آدرس نا معتبر";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "آدرس نا معتبر";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "آدرس نا معتبر";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "آدرس نا معتبر";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "آدرس نا معتبر";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
