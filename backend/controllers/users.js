const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const ConflictErrors = require('../errors/ConflictErrors');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const { errorMessages } = require('../utils/constants');

const { JWT_SECRET_KEY = 'dev' } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    email,
    name,
    password,
  } = req.body;

  const createUser = (hash) => User.create({
    email,
    name,
    password: hash,
  });
  bcrypt
    .hash(password, 10)
    .then((hash) => createUser(hash))
    .then((user) => {
      const { _id } = user;
      res.send({
        _id,
        email,
        name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.dataError));
      } else if (err.code === 11000) {
        next(new ConflictErrors(errorMessages.emailError));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const findForModify = () => User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { runValidators: true },
  );

  User.find({ email })
    .then(([user]) => {
      if (user && user._id !== req.user._id) {
        throw new ConflictErrors(errorMessages.emailError);
      }
      return findForModify();
    })
    .then(() => {
      res.send({
        email,
        name,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(errorMessages.userNotFoundError));
      }
      return res.send(...user);
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'Вы вышли из системы.' });
};
