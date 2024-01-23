/** @format */

const express = require('express');

const { validateBody, authenticate, isEmptyBody } = require('../../middlewares');
const { favoriteSchema } = require('../../models');
const { changeSubscription } = require('../../controllers/users');
const { ctrlWrapper } = require('../../utils');

const usersRouter = express.Router();

usersRouter.patch(
	'/',
	isEmptyBody,
	authenticate,
	validateBody(favoriteSchema),
	ctrlWrapper(changeSubscription)
);

module.exports = usersRouter;
