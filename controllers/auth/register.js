/** @format */

const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User } = require('../../models');
const { HttpError, sendMailer } = require('../../utils');

const { BASE_URL } = process.env;

const register = async ({ body }, res) => {
	const { email, password } = body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email in use');
	}
	const hashPassword = await bcrypt.hash(password, 10);

	const avatarURL = gravatar.url(email);
	const verificationToken = nanoid();

	const newUser = await User.create({
		...body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});

	const confirmEmail = {
		to: email,
		subject: 'Verify email',
		html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click confirm email</a>`,
	};

	await sendMailer(confirmEmail);

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

module.exports = register;
