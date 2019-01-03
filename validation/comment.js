const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (validator.isEmpty(data.text)) {
    errors.text = "فیلد کامنت نمی‌تواند خالی باشد";
  }

  if (!validator.isLength(data.text, { min: 2, max: 300 })) {
    errors.text = "طول کامنت باید بین ۲ تا ۳۰۰ کاراکتر باشد";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
