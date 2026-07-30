import { test } from '@japa/runner';
import { migrateDatabase, truncateDatabase } from '#tests/database_test_utils';
import { RedirectFactory } from '#tests/factories/index';

test.group('Public redirects', (group) => {
	group.each.setup(async () => {
		await migrateDatabase();
		await truncateDatabase();
	});

	test('redirects a known slug to its destination', async ({ client }) => {
		await RedirectFactory.merge({
			slug: 'adonisjs',
			destination: 'https://adonisjs.com',
		}).create();

		const response = await client.get('/adonisjs').header('host', 'redirect.localhost').redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', 'https://adonisjs.com');
	});

	test('returns not found for an unknown slug', async ({ client }) => {
		const response = await client.get('/unknown').header('host', 'redirect.localhost');

		response.assertStatus(404);
	});
});
