/** @format */

// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

const { describe, expect, test } = require('@jest/globals');
const login = require('./login');

const req = {
	body: {
		email: 'dilan@magnis.org',
		password: '123456789',
	},
};

describe('test login fn', () => {
	test('login return status 200', async () => {
		const { status } = await login(req);
		expect(status).toBe(200);
	});

	test('login return token', async () => {
		const { token } = await login(req);
		expect(token).toBe(expect.any(String));
	});

	test('login return user {}', async () => {
		const { user: userData } = await login(req);
		expect(userData).toBe({
			email: req.body.email,
			subscription: expect.any(String),
		});
	});
});
