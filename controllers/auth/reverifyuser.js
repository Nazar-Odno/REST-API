/** @format */

const { User } = require('../../models');
const { HttpError, sendMailer } = require('../../utils');

const { BASE_URL } = process.env;

const reVerifyUser = async ({ body }, res) => {
	const { email } = body;

	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	if (user.verify) {
		throw HttpError(400, 'Verification has already been passed');
	}

	const confirmEmail = {
		to: email,
		subject: 'Verify email',
		html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click confirm email</a>`,
	};

	await sendMailer(confirmEmail);

	res.status(200).json({
		message: 'Verification email sent',
	});
};

module.exports = reVerifyUser;
