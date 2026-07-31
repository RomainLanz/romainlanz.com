import hash from '@adonisjs/core/services/hash';
import { test } from '@japa/runner';
import { migrateDatabase, truncateDatabase } from '#tests/database_test_utils';
import { AdminFactory } from '#tests/factories/index';

const sessionCookieName = 'romainlanz-session';

test.group('Session authentication', (group) => {
	group.each.setup(async () => {
		await migrateDatabase();
		await truncateDatabase();
	});

	test('logs in with valid credentials and grants access to a protected admin route', async ({ client, assert }) => {
		await AdminFactory.merge({
			email: 'romain@example.com',
			password: await hash.make('secret-password'),
		}).create();
		const loginResponse = await client
			.post('/login')
			.withCsrfToken()
			.redirects(0)
			.form({ email: 'romain@example.com', password: 'secret-password' });

		loginResponse.assertStatus(302);
		loginResponse.assertHeader('location', '/');
		loginResponse.assertCookie(sessionCookieName);

		const sessionCookie = loginResponse.cookie(sessionCookieName);
		assert.exists(sessionCookie);

		const dashboardResponse = await client.get('/admin/dashboard').cookie(sessionCookieName, sessionCookie!.value);

		dashboardResponse.assertStatus(200);
	});

	test('rejects invalid credentials and preserves the existing flash error contract', async ({ client }) => {
		await AdminFactory.merge({
			email: 'romain@example.com',
			password: await hash.make('secret-password'),
		}).create();
		const response = await client
			.post('/login')
			.withCsrfToken()
			.redirects(0)
			.header('referer', '/')
			.form({ email: 'romain@example.com', password: 'invalid-password' });

		response.assertStatus(302);
		response.assertHeader('location', '/');
		response.assertFlashMessage('errorsBag', {
			E_INVALID_CREDENTIALS: "Aucun compte n'a été trouvé avec les identifiants fournis.",
		});
	});

	test('logs out an authenticated user', async ({ client, assert }) => {
		await AdminFactory.merge({
			email: 'romain@example.com',
			password: await hash.make('secret-password'),
		}).create();
		const loginResponse = await client
			.post('/login')
			.withCsrfToken()
			.redirects(0)
			.form({ email: 'romain@example.com', password: 'secret-password' });
		const sessionCookie = loginResponse.cookie(sessionCookieName);
		assert.exists(sessionCookie);

		const logoutResponse = await client
			.delete('/logout')
			.withCsrfToken()
			.redirects(0)
			.cookie(sessionCookieName, sessionCookie!.value);

		logoutResponse.assertStatus(302);
		logoutResponse.assertHeader('location', '/');

		const loggedOutSessionCookie = logoutResponse.cookie(sessionCookieName);
		assert.exists(loggedOutSessionCookie);

		const dashboardResponse = await client
			.get('/admin/dashboard')
			.redirects(0)
			.cookie(sessionCookieName, loggedOutSessionCookie!.value);

		dashboardResponse.assertStatus(302);
		dashboardResponse.assertHeader('location', '/');
	});
});
