import { test } from '@japa/runner';
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
});
