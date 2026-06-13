import { test } from '@japa/runner';
import { AdminTagFixture } from '#tests/fixtures/admin_tag_fixture';

test.group('Admin tag creation', (group) => {
	let fixture: AdminTagFixture;

	group.each.setup(async () => {
		fixture = new AdminTagFixture();
		await fixture.resetDatabase();
	});

	test('creates a Tag from the admin with a controlled color', async ({ client }) => {
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

	test('rejects a Tag when the slug already exists', async ({ client }) => {
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

	test('rejects a Tag when the color is not controlled by the design system', async ({ client }) => {
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
