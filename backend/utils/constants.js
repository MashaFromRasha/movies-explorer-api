const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
  'movie.murochkina.nomoredomains.xyz',
  'https://movie.murochkina.nomoredomains.xyz',
  'http://movie.murochkina.nomoredomains.xyz',
  'api.movie.murochkina.nomoredomains.xyz',
  'https://api.movie.murochkina.nomoredomains.xyz',
  'http://api.movie.murochkina.nomoredomains.xyz',
];

const errorMessages = {
  emailError: 'Пользователь с таким EMAIL уже зарегистрирован',
  authorizationError: 'Ошибка авторизации',
  loginError: 'Неправильные почта или пароль',
  crashTest: 'Сервет сейчас упадет',
  dataError: 'Переданы некорректные данные',
  urlError: 'Не является URL адресом',
  movieNotFoundError: 'Фильм не найден',
  movieDeleteError: 'Вы не можете удалить этот фильм',
  userNotFoundError: 'Указанный пользователь не найден',
  wrongPathError: 'По указанному пути ничего нет',
};

module.exports = { allowedCors, errorMessages };
