import { test } from '@japa/runner';
import { err, ok } from '#core/result';
import { CreateTag } from '#taxonomies/actions/create_tag';
import { Tag } from '#taxonomies/domain/tag';
import type { TagRepository } from '#taxonomies/repositories/tag_repository';

type CreatePayload = Parameters<TagRepository['create']>[0];

test.group('Taxonomy actions', () => {
	test('creates a tag through the taxonomy repository', async ({ assert }) => {
		let payload: CreatePayload | undefined;
		const createdTag = { props: { name: 'Vue JS' } };
		const repository = {
			async create(value: CreatePayload) {
				payload = value;
				return ok(createdTag as Tag);
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
		assert.deepEqual(result, { ok: true, value: createdTag });
	});

	test('returns an explicit error when the Tag name already exists', async ({ assert }) => {
		const repository = {
			async create() {
				return err({ type: 'tag_name_already_exists' as const });
			},
		} as unknown as TagRepository;

		const result = await new CreateTag(repository).execute({ name: 'Vue JS', color: 'cyan' });

		assert.deepEqual(result, { ok: false, error: { type: 'tag_name_already_exists' } });
	});

	test('returns an explicit error when the custom Tag slug already exists', async ({ assert }) => {
		const repository = {
			async create() {
				return err({ type: 'tag_slug_already_exists' as const });
			},
		} as unknown as TagRepository;

		const result = await new CreateTag(repository).execute({ name: 'Vue JS', slug: 'vue', color: 'cyan' });

		assert.deepEqual(result, { ok: false, error: { type: 'tag_slug_already_exists' } });
	});
});
