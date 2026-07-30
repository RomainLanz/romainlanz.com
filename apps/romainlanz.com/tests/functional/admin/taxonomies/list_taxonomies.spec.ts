import { test } from '@japa/runner';
import { AdminTagFixture } from '#tests/fixtures/admin_tag_fixture';

test.group('Admin taxonomy listing', (group) => {
	let fixture: AdminTagFixture;

	group.each.setup(async () => {
		fixture = new AdminTagFixture();
		await fixture.resetDatabase();
	});

	test('forbids a regular user from listing taxonomies', async ({ client }) => {
		const user = await fixture.givenUser();
		const response = await client.get('/admin/taxonomies').loginAs(user);

		response.assertStatus(403);
	});

	test('lists Tags with their admin fields', async ({ client, assert }) => {
		await fixture.givenTag({ name: 'Adonis JS', slug: 'adonis', color: 'cyan' });
		await fixture.givenTag({ name: 'Vue JS', slug: 'vue', color: 'lime' });

		const props = await fixture.visitTaxonomiesAsAdmin(client);

		assert.deepEqual(
			props.vm.tags.map(({ name, slug, color }) => ({ name, slug, color })),
			[
				{ name: 'Adonis JS', slug: 'adonis', color: 'cyan' },
				{ name: 'Vue JS', slug: 'vue', color: 'lime' },
			],
		);
	});
});
