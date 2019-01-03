const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (validator.isEmpty(data.text)) {
    errors.text = "فیلد پست نمی‌تواند خالی باشد";
  }

  if (!validator.isLength(data.text, { min: 2, max: 300 })) {
    errors.text = "طول پست باید بین ۲ تا ۳۰۰ کاراکتر باشد";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
