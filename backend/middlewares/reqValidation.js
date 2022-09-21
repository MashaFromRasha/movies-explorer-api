const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { errorMessages } = require('../utils/constants');

module.exports.patchProfileValidityCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(1).max(30).required(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    director: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    duration: Joi.number().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errorMessages.urlError);
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errorMessages.urlError);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errorMessages.urlError);
    }),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.vaidateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(1).max(30).required(),
    password: Joi.string().required(),
  }),
});
