import { test } from '@japa/runner';
import { AdminTagFixture } from '#tests/fixtures/admin_tag_fixture';

test.group('Admin tag update', (group) => {
	let fixture: AdminTagFixture;

	group.each.setup(async () => {
		fixture = new AdminTagFixture();
		await fixture.resetDatabase();
	});

	test('forbids a regular user from updating a Tag', async ({ client }) => {
		const tag = await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });
		const user = await fixture.givenUser();
		const response = await client
			.put(`/admin/taxonomies/tags/${tag.id}`)
			.loginAs(user)
			.withCsrfToken()
			.redirects(0)
			.header('accept', 'application/json')
			.form({ name: 'Changed', slug: 'changed', color: 'lime' });

		response.assertStatus(403);
		await fixture.thenTagShouldExist('adonis', { name: 'Adonis JS', slug: 'adonis', color: 'cyan' });
	});

	test('renders the Tag values in the update page', async ({ client, assert }) => {
		const tag = await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });

		const props = await fixture.visitTagUpdateAsAdmin(client, tag.id);

		assert.deepEqual(props.tag, {
			id: tag.id,
			name: 'Adonis JS',
			slug: 'adonis',
			color: 'cyan',
		});
	});

	test('updates a Tag name, slug, and controlled color', async ({ client }) => {
		const tag = await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });

		const response = await fixture.updateTagAsAdmin(client, tag.id, {
			name: 'Adonis Framework',
			slug: 'adonis-framework',
			color: 'violet',
		});

		response.assertRedirectsTo('/admin/taxonomies');
		await fixture.thenTagShouldExist('adonis-framework', {
			name: 'Adonis Framework',
			slug: 'adonis-framework',
			color: 'violet',
		});
		await fixture.thenTagShouldNotExist('adonis');
	});

	test('keeps the Tag slug stable when only its name changes', async ({ client }) => {
		const tag = await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });

		await fixture.updateTagAsAdmin(client, tag.id, {
			name: 'Adonis Framework',
			slug: 'adonis',
			color: 'cyan',
		});

		await fixture.thenTagShouldExist('adonis', {
			name: 'Adonis Framework',
			slug: 'adonis',
			color: 'cyan',
		});
	});

	test('rejects a Tag name already used by another Tag', async ({ client }) => {
		const tag = await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });
		await fixture.givenTag({ name: 'Vue JS', slug: 'vue', color: 'lime' });

		const response = await fixture.updateTagAsAdmin(
			client,
			tag.id,
			{ name: 'Vue JS', slug: 'adonis', color: 'cyan' },
			{ followRedirects: false },
		);

		response.assertStatus(302);
		response.assertHeader('location', `/admin/taxonomies/tags/${tag.id}/edit`);
		response.assertFlashMessage('inputErrorsBag', { name: ['Ce nom est déjà utilisé.'] });
	});

	test('rejects a Tag slug already used by another Tag', async ({ client }) => {
		const tag = await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });
		await fixture.givenTag({ name: 'Vue JS', slug: 'vue', color: 'lime' });

		const response = await fixture.updateTagAsAdmin(
			client,
			tag.id,
			{
				name: 'Adonis JS',
				slug: 'vue',
				color: 'cyan',
			},
			{ followRedirects: false },
		);

		response.assertStatus(302);
		response.assertHeader('location', `/admin/taxonomies/tags/${tag.id}/edit`);
		response.assertFlashMessage('inputErrorsBag', {
			slug: ['Ce slug est déjà utilisé.'],
		});
	});

	test('rejects a Tag color not supported by the design system', async ({ client }) => {
		const tag = await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });

		const response = await fixture.updateTagAsAdmin(
			client,
			tag.id,
			{
				name: 'Adonis JS',
				slug: 'adonis',
				color: 'orange',
			},
			{ followRedirects: false },
		);

		response.assertStatus(302);
		response.assertHeader('location', `/admin/taxonomies/tags/${tag.id}/edit`);
		response.assertFlashMessage('inputErrorsBag', {
			color: ['Cette couleur n’est pas disponible.'],
		});
	});

	test('rejects a blank Tag name', async ({ client }) => {
		const tag = await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });

		const response = await fixture.updateTagAsAdmin(
			client,
			tag.id,
			{ name: ' ', slug: 'adonis', color: 'cyan' },
			{ followRedirects: false },
		);

		response.assertStatus(302);
		response.assertHeader('location', `/admin/taxonomies/tags/${tag.id}/edit`);
		await fixture.thenTagShouldExist('adonis', { name: 'Adonis JS', slug: 'adonis', color: 'cyan' });
	});

	test('rejects a blank Tag slug', async ({ client }) => {
		const tag = await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });

		const response = await fixture.updateTagAsAdmin(
			client,
			tag.id,
			{ name: 'Adonis JS', slug: ' ', color: 'cyan' },
			{ followRedirects: false },
		);

		response.assertStatus(302);
		response.assertHeader('location', `/admin/taxonomies/tags/${tag.id}/edit`);
		await fixture.thenTagShouldExist('adonis', { name: 'Adonis JS', slug: 'adonis', color: 'cyan' });
	});

	test('returns not found when rendering a Tag that does not exist', async ({ client }) => {
		const admin = await fixture.givenAdmin();
		const response = await client
			.get('/admin/taxonomies/tags/7a28e15e-f122-4fa6-aaf2-64fc5d6b8d02/edit')
			.loginAs(admin);

		response.assertStatus(404);
	});

	test('returns not found when updating a Tag that does not exist', async ({ client }) => {
		const response = await fixture.updateTagAsAdmin(
			client,
			'7a28e15e-f122-4fa6-aaf2-64fc5d6b8d02',
			{ name: 'Missing Tag', slug: 'missing-tag', color: 'cyan' },
			{ followRedirects: false },
		);

		response.assertStatus(404);
	});

	test('returns not found for a malformed Tag identifier', async ({ client }) => {
		const admin = await fixture.givenAdmin();
		const renderResponse = await client.get('/admin/taxonomies/tags/not-a-uuid/edit').loginAs(admin);
		const updateResponse = await client
			.put('/admin/taxonomies/tags/not-a-uuid')
			.loginAs(admin)
			.withCsrfToken()
			.form({ name: 'Missing Tag', slug: 'missing-tag', color: 'cyan' });

		renderResponse.assertStatus(404);
		updateResponse.assertStatus(404);
	});
});
