import { test } from '@japa/runner';
import { UserRepository } from '#auth/repositories/user_repository';
import { db } from '#core/services/db';
import { migrateDatabase, truncateDatabase } from '#tests/database_test_utils';
import { AdminFactory, RedirectFactory } from '#tests/factories/index';

const userRepository = new UserRepository();

async function createAdmin() {
	const record = await AdminFactory.create();
	const admin = await userRepository.findUserByEmail(record.email);

	if (!admin) throw new Error('Admin user was not created');

	return admin;
}

test.group('Admin redirects', (group) => {
	group.each.setup(async () => {
		await migrateDatabase();
		await truncateDatabase();
	});

	test('lists redirects with their admin fields', async ({ client, assert }) => {
		const admin = await createAdmin();
		const redirect = await RedirectFactory.merge({
			slug: 'adonisjs',
			destination: 'https://adonisjs.com',
		}).create();

		const response = await client.get('/admin/redirects').loginAs(admin).withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('admin/redirects/list');
		assert.deepInclude(response.inertiaProps, {
			vm: {
				redirects: [
					{
						id: redirect.id,
						slug: 'adonisjs',
						destination: 'https://adonisjs.com',
					},
				],
			},
		});
	});

	test('creates a redirect', async ({ client, assert }) => {
		const admin = await createAdmin();
		const response = await client
			.post('/admin/redirects')
			.loginAs(admin)
			.withCsrfToken()
			.redirects(0)
			.form({ slug: 'adonisjs', destination: 'https://adonisjs.com' });

		response.assertStatus(302);
		response.assertHeader('location', '/admin/redirects');
		assert.deepInclude(await db.selectFrom('redirects').select(['slug', 'destination']).executeTakeFirstOrThrow(), {
			slug: 'adonisjs',
			destination: 'https://adonisjs.com',
		});
	});

	test('deletes a redirect', async ({ client, assert }) => {
		const admin = await createAdmin();
		const redirect = await RedirectFactory.create();
		const response = await client.delete(`/admin/redirects/${redirect.id}`).loginAs(admin).withCsrfToken().redirects(0);

		response.assertStatus(302);
		response.assertHeader('location', '/admin/redirects');
		assert.isUndefined(await db.selectFrom('redirects').select('id').where('id', '=', redirect.id).executeTakeFirst());
	});
});
