/** @format */

const express = require('express');

const { validateBody, authenticate, upload, isEmptyBody } = require('../../middlewares');
const { registerSchema, loginSchema, verifyEmailSchema } = require('../../models');
const {
	register,
	login,
	logout,
	getCurrent,
	changeAvatar,
	confirmVerify,
	reVerifyUser,
} = require('../../controllers/auth');
const { ctrlWrapper } = require('../../utils');

const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, validateBody(registerSchema), ctrlWrapper(register));

authRouter.post('/login', isEmptyBody, validateBody(loginSchema), ctrlWrapper(login));

authRouter.post('/logout', authenticate, ctrlWrapper(logout));

authRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

authRouter.patch(
	'/avatar',
	isEmptyBody,
	authenticate,
	upload.single('avatar'),
	ctrlWrapper(changeAvatar)
);

authRouter.get('/verify/:verificationToken', ctrlWrapper(confirmVerify));

authRouter.post(
	'/verify',
	isEmptyBody,
	validateBody(verifyEmailSchema, 'Missing required field email'),
	ctrlWrapper(reVerifyUser)
);

module.exports = authRouter;
