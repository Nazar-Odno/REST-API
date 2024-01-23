/** @format */

const nodemailer = require('nodemailer');
require('dotenv').config();

const { SENDMAILER_LOGIN, SENDMAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: SENDMAILER_LOGIN,
		pass: SENDMAILER_PASSWORD,
	},
});

const sendMailer = async confirmEmail => {
	const email = { ...confirmEmail, from: SENDMAILER_LOGIN };
	await transporter.sendMail(email);
};

module.exports = sendMailer;
