import { test } from '@japa/runner';
import { AdminTagFixture } from '#tests/fixtures/admin_tag_fixture';

test.group('Admin tag creation', (group) => {
	let fixture: AdminTagFixture;

	group.each.setup(async () => {
		fixture = new AdminTagFixture();
		await fixture.resetDatabase();
	});

	test('forbids a regular user from creating a Tag', async ({ client }) => {
		const user = await fixture.givenUser();
		const response = await client
			.post('/admin/taxonomies/tags')
			.loginAs(user)
			.withCsrfToken()
			.redirects(0)
			.header('accept', 'application/json')
			.form({ name: 'Vue JS', color: 'cyan' });

		response.assertStatus(403);
		await fixture.thenTagShouldNotExist('vue-js');
	});

	test('creates a Tag with a custom slug and a controlled color', async ({ client }) => {
		const response = await fixture.createTagAsAdmin(client, {
			name: 'Vue JS',
			slug: 'vue',
			color: 'cyan',
		});

		response.assertRedirectsTo('/admin/taxonomies');
		await fixture.thenTagShouldExist('vue', {
			name: 'Vue JS',
			slug: 'vue',
			color: 'cyan',
		});
	});

	test('generates the Tag slug from the name when no slug is provided', async ({ client }) => {
		const response = await fixture.createTagAsAdmin(client, {
			name: 'Vue JS',
			color: 'cyan',
		});

		response.assertRedirectsTo('/admin/taxonomies');
		await fixture.thenTagShouldExist('vue-js', {
			name: 'Vue JS',
			slug: 'vue-js',
			color: 'cyan',
		});
	});

	test('suffixes an automatically generated slug when it already exists', async ({ client }) => {
		await fixture.givenTag({ name: 'Legacy', slug: 'coeur-and-ame', color: 'cyan' });

		const response = await fixture.createTagAsAdmin(client, {
			name: 'Cœur & Âme',
			color: 'lime',
		});

		response.assertRedirectsTo('/admin/taxonomies');
		await fixture.thenTagShouldExist('coeur-and-ame-2', {
			name: 'Cœur & Âme',
			slug: 'coeur-and-ame-2',
			color: 'lime',
		});
	});

	test('rejects a custom Tag slug when it already exists', async ({ client }) => {
		await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });

		const response = await fixture.createTagAsAdmin(
			client,
			{
				name: 'Adonis Framework',
				slug: 'adonis',
				color: 'lime',
			},
			{ followRedirects: false },
		);

		response.assertStatus(302);
		response.assertHeader('location', '/admin/taxonomies/tags/create');
		response.assertFlashMessage('inputErrorsBag', {
			slug: ['Ce slug est déjà utilisé.'],
		});
	});

	test('rejects a Tag name when it already exists', async ({ client }) => {
		await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });

		const response = await fixture.createTagAsAdmin(
			client,
			{
				name: 'Adonis JS',
				slug: 'adonis-framework',
				color: 'lime',
			},
			{ followRedirects: false },
		);

		response.assertStatus(302);
		response.assertHeader('location', '/admin/taxonomies/tags/create');
		response.assertFlashMessage('inputErrorsBag', {
			name: ['Ce nom est déjà utilisé.'],
		});
	});

	test('rejects a Tag color not supported by the design system', async ({ client }) => {
		const response = await fixture.createTagAsAdmin(
			client,
			{
				name: 'TypeScript',
				slug: 'typescript',
				color: 'orange',
			},
			{ followRedirects: false },
		);

		response.assertStatus(302);
		response.assertHeader('location', '/admin/taxonomies/tags/create');
		response.assertFlashMessage('inputErrorsBag', {
			color: ['Cette couleur n’est pas disponible.'],
		});
	});
});
