import { test } from '@japa/runner';
import { CreateTag } from '#taxonomies/actions/create_tag';
import type { TagRepository } from '#taxonomies/repositories/tag_repository';

type CreatePayload = Parameters<TagRepository['create']>[0];

test.group('Taxonomy actions', () => {
	test('creates a tag through the taxonomy repository', async ({ assert }) => {
		let payload: CreatePayload | undefined;
		const createdTag = { props: { name: 'Vue JS' } };
		const repository = {
			async create(value: CreatePayload) {
				payload = value;
				return createdTag;
			},
		} as unknown as TagRepository;

		const result = await new CreateTag(repository).execute({
			name: 'Vue JS',
			slug: 'vue',
			color: 'cyan',
		});

		assert.deepEqual(payload, {
			name: 'Vue JS',
			slug: 'vue',
			color: 'cyan',
		});
		assert.strictEqual(result, createdTag);
	});
});
