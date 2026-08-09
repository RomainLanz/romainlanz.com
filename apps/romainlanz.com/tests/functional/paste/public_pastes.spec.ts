import { test } from '@japa/runner';
import { db } from '#shared/services/db';
import { migrateDatabase, truncateDatabase } from '#tests/database_test_utils';
import { PasteFactory } from '#tests/factories/index';

const pasteHost = 'paste.romainlanz.localhost';

test.group('Public pastes', (group) => {
	group.each.setup(async () => {
		await migrateDatabase();
		await truncateDatabase();
	});

	test('renders the paste creation page with supported languages', async ({ client, assert }) => {
		const response = await client.get('/').header('host', pasteHost).withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('pastes/create');
		const props = response.inertiaProps as { bundledLanguages: Array<{ id: string; name: string }> };
		assert.deepEqual(
			props.bundledLanguages.find((language) => language.id === 'typescript'),
			{ id: 'typescript', name: 'TypeScript' },
		);
	});

	test('creates a highlighted anonymous paste and redirects to it', async ({ client, assert }) => {
		const response = await client
			.post('/')
			.header('host', pasteHost)
			.json({ lang: 'typescript', content: 'const answer = 42;' })
			.withCsrfToken()
			.redirects(0);

		response.assertStatus(302);
		assert.match(response.header('location')!, /^http:\/\/paste\.romainlanz\.localhost\/[0-9a-f-]{36}$/);

		const paste = await db.selectFrom('pastes').selectAll().executeTakeFirstOrThrow();
		assert.isNull(paste.user_id);
		assert.include(paste.content, 'shiki');
		assert.include(paste.content, '--shiki-dark');
		assert.include(paste.content, 'answer');
	});

	test('renders a stored paste', async ({ client, assert }) => {
		const paste = await PasteFactory.merge({ content: '<pre>Stored paste</pre>' }).create();

		const response = await client.get(`/${paste.id}`).header('host', pasteHost).withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('pastes/show');
		assert.deepInclude(response.inertiaProps, {
			vm: {
				paste: {
					id: paste.id,
					content: '<pre>Stored paste</pre>',
				},
			},
		});
	});

	test('returns not found for an unknown paste', async ({ client }) => {
		const response = await client.get('/7a28e15e-f122-4fa6-aaf2-64fc5d6b8d02').header('host', pasteHost).withInertia();

		response.assertStatus(404);
	});
});
