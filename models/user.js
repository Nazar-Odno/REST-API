/** @format */

const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const typeSubscription = ['starter', 'pro', 'business'];

const userRegisterSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for user'],
		},
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: [true, 'Set email for user'],
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, 'Set password for user'],
		},
		subscription: {
			type: String,
			enum: typeSubscription,
			default: 'starter',
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: {
			type: String,
			required: true,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, 'Verify token is required'],
		},
	},
	{ versionKey: false, timestamps: true }
);

userRegisterSchema.post('save', (err, _data, next) => {
	err.status = 400;
	next();
});

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const favoriteSchema = Joi.object({
	subscription: Joi.string()
		.valid(...typeSubscription)
		.required(),
});

const verifyEmailSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
});

const User = model('user', userRegisterSchema);

module.exports = {
	User,
	registerSchema,
	loginSchema,
	favoriteSchema,
	verifyEmailSchema,
};
