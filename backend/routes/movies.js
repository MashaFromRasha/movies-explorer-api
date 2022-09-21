const movieRouter = require('express').Router();

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

const {
  vaidateDeleteMovie,
  validateCreateMovie,
} = require('../middlewares/reqValidation');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateCreateMovie, createMovie);
movieRouter.delete('/:movieId', vaidateDeleteMovie, deleteMovie);

module.exports = movieRouter;
