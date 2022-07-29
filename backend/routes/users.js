const userRouter = require('express').Router();

const {
  updateUser,
  getMe,
} = require('../controllers/users');

const { patchProfileValidityCheck } = require('../middlewares/reqValidation');

userRouter.patch('/me', patchProfileValidityCheck, updateUser);

userRouter.get('/me', getMe);

module.exports = userRouter;
