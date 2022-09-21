const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { errorMessages } = require('../utils/constants');
const AuthorizationError = require('../errors/AutorizationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }, { runValidators: true })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError(errorMessages.loginError));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorizationError(errorMessages.loginError));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
