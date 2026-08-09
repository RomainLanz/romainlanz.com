import { test } from '@japa/runner';
import { AdminTagFixture } from '#tests/fixtures/admin_tag_fixture';

test.group('Admin tag update', (group) => {
	let fixture: AdminTagFixture;

	group.each.setup(async () => {
		fixture = new AdminTagFixture();
		await fixture.resetDatabase();
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
});
