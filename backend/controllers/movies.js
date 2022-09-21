const Movie = require('../models/movie');

const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const { errorMessages } = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    director,
    year,
    image,
    country,
    description,
    duration,
    trailerLink,
    thumbnail,
    movieId,
  } = req.body;

  const owner = req.user._id;
  Movie.create({
    nameRU,
    nameEN,
    director,
    year,
    image,
    country,
    description,
    duration,
    trailerLink,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorMessages.dataError));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(errorMessages.movieNotFoundError))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError(errorMessages.movieDeleteError);
      }
      Movie.findByIdAndDelete(req.params.movieId)
        .then((movieData) => {
          res.send({ data: movieData });
        })
        .catch(next);
    })
    .catch(next);
};
