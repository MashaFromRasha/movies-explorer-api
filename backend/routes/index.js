const users = require('./users');
const movies = require('./movies');
const { errorMessages } = require('../utils/constants');
const authorization = require('./authorization');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

module.exports = function (app) {
  app.use('/', authorization);
  app.use(auth);
  app.use('/movies', movies);
  app.use('/users', users);
  app.all('*', (req, res, next) => {
    next(new NotFoundError(errorMessages.wrongPathError));
  });
};
