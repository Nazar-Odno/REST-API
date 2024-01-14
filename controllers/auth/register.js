/** @format */

const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const { User } = require('../../models');
const { HttpError } = require('../../utils');

const register = async ({ body }, res) => {
	const { email, password } = body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email in use');
	}
	const hashPassword = await bcrypt.hash(password, 10);

	const avatarURL = gravatar.url(email);

	const newUser = await User.create({ ...body, password: hashPassword, avatarURL });

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

module.exports = register;
