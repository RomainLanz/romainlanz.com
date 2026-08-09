import { test } from '@japa/runner';
import { db } from '#shared/services/db';
import { FindCategoryBySlugQuery } from '#taxonomies/queries/find_category_by_slug_query';
import { FindTagBySlugQuery } from '#taxonomies/queries/find_tag_by_slug_query';
import { TagRepository } from '#taxonomies/repositories/tag_repository';
import { migrateDatabase } from '#tests/database_test_utils';
import { TagFixture } from '#tests/fixtures/tag_fixture';

test.group('Tag public model', (group) => {
	let fixture: TagFixture;

	group.each.setup(async () => {
		fixture = new TagFixture();
		await fixture.resetDatabase();
	});

	test('creates a tag with a slug generated from its name', async () => {
		const tag = await fixture.whenICreateATag({
			name: 'Vue JS',
			color: 'cyan',
		});

		await fixture.thenTagShouldExposePublicData(tag.props.slug, {
			name: 'Vue JS',
			slug: 'vue-js',
			color: 'cyan',
		});
	});

	test('keeps generated slugs unique when names collide', async () => {
		const firstTag = await fixture.whenICreateATag({
			name: 'Vue JS',
			color: 'cyan',
		});
		const secondTag = await fixture.whenICreateATag({
			name: 'Vue-JS',
			color: 'yellow',
		});

		await fixture.thenTagShouldExposePublicData(firstTag.props.slug, {
			name: 'Vue JS',
			slug: 'vue-js',
			color: 'cyan',
		});
		await fixture.thenTagShouldExposePublicData(secondTag.props.slug, {
			name: 'Vue-JS',
			slug: 'vue-js-2',
			color: 'yellow',
		});
	});

	test('keeps the public slug stable after a rename', async () => {
		const tag = await fixture.givenATagExists({
			name: 'Adonis JS',
			color: 'red',
		});
		const renamedTag = await fixture.whenIRenameTag(tag, {
			name: 'Adonis JS Framework',
			color: 'violet',
		});

		await fixture.thenTagShouldExposePublicData(renamedTag.props.slug, {
			name: 'Adonis JS Framework',
			slug: 'adonis-js',
			color: 'violet',
		});
	});

	test('observes a missing Tag when an update affects no row', async ({ assert }) => {
		const repository = new TagRepository();

		const result = await repository.update({
			id: '7a28e15e-f122-4fa6-aaf2-64fc5d6b8d02',
			name: 'Missing Tag',
			color: 'cyan',
		});

		assert.deepEqual(result, { ok: true, value: null });
	});

	test('returns an explicit error when a Tag slug does not exist', async ({ assert }) => {
		const result = await new FindTagBySlugQuery().execute('missing-tag');

		assert.deepEqual(result, { ok: false, error: { type: 'tag_not_found' } });
	});

	test('returns an explicit error when a Category slug does not exist', async ({ assert }) => {
		const result = await new FindCategoryBySlugQuery().execute('missing-category');

		assert.deepEqual(result, { ok: false, error: { type: 'category_not_found' } });
	});

	test('allows explicitly updating the public slug', async () => {
		const tag = await fixture.givenATagExists({
			name: 'Adonis JS',
			color: 'red',
		});
		const updatedTag = await fixture.whenIUpdateTag(tag, {
			name: 'Adonis JS Framework',
			slug: 'adonis-framework',
			color: 'violet',
		});

		await fixture.thenTagShouldExposePublicData(updatedTag.props.slug, {
			name: 'Adonis JS Framework',
			slug: 'adonis-framework',
			color: 'violet',
		});
	});

	test('lists tags with their public fields', async () => {
		await fixture.whenICreateATag({
			name: 'Node JS',
			color: 'lime',
		});

		const tags = await fixture.whenIListTags();

		fixture.assert.deepEqual(
			tags.map((tag) => ({
				name: tag.props.name,
				slug: tag.props.slug,
				color: tag.props.color,
			})),
			[
				{
					name: 'Node JS',
					slug: 'node-js',
					color: 'lime',
				},
			],
		);
	});

	test('rejects colors outside the design system variants', async () => {
		await fixture.assert.rejects(async () => {
			await fixture.whenICreateATag({
				name: 'TypeScript',
				color: 'orange',
			});
		}, /Unsupported tag color "orange"/);
	});

	test('normalizes legacy colors and enforces supported colors during migration', async ({ assert }) => {
		await migrateDatabase('1749688200000_add_slug_to_tags_table');
		await db
			.insertInto('tags')
			.values([
				{ id: '48c7e14c-6b31-467a-af4d-870ba01da925', name: 'Legacy', slug: 'legacy', color: 'orange' },
				{ id: '2848de49-6ff4-47af-bc5d-2a30def1aef8', name: 'Supported', slug: 'supported', color: 'lime' },
			])
			.execute();

		await migrateDatabase();

		const tags = await db.selectFrom('tags').select(['slug', 'color']).orderBy('slug').execute();
		assert.deepEqual(tags, [
			{ slug: 'legacy', color: 'cyan' },
			{ slug: 'supported', color: 'lime' },
		]);

		let constraintError: unknown;
		try {
			await db.updateTable('tags').set({ color: 'orange' }).where('slug', '=', 'legacy').execute();
		} catch (error) {
			constraintError = error;
		}

		assert.instanceOf(constraintError, Error);
		assert.propertyVal(constraintError, 'code', '23514');
		assert.propertyVal(constraintError, 'constraint', 'tags_color_check');
	});
});
