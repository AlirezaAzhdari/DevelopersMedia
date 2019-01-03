const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      msg: "{value is not a valid email}"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics.findByCredentials = function(email, password, errors) {
  User = this;
  return User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "کاربری با این ایمیل یافت نشد";
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            errors.password = "پسوورد اشتباه است";
            reject();
          }
        });
      });
    })
    .catch(err => {
      return new Promise.reject();
    });
};

UserSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model("user", UserSchema);

module.exports = { User };
