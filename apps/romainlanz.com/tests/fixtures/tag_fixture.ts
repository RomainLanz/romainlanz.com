import { FindTagBySlugQuery } from '#taxonomies/queries/find_tag_by_slug_query';
import { ListTagsQuery } from '#taxonomies/queries/list_tags_query';
import { TagRepository } from '#taxonomies/repositories/tag_repository';
import { DatabaseFixture } from '#tests/fixtures/database_fixture';
import type { Tag } from '#taxonomies/domain/tag';
import type { TagColor } from '@rlanz/design-system/tag-color';

interface TagAttributes {
	name: string;
	color: string;
}

export class TagFixture extends DatabaseFixture {
	readonly #repository = new TagRepository();
	readonly #findTagBySlug = new FindTagBySlugQuery();
	readonly #listTags = new ListTagsQuery();

	async givenATagExists(attributes: Partial<TagAttributes> = {}) {
		return this.whenICreateATag({
			name: 'Adonis JS',
			color: 'cyan',
			...attributes,
		});
	}

	whenICreateATag(attributes: TagAttributes) {
		return this.#repository.create(attributes);
	}

	whenIRenameTag(tag: Tag, attributes: TagAttributes) {
		return this.#repository.update({
			id: tag.getIdentifier().toString(),
			...attributes,
		});
	}

	async whenIListTags() {
		return this.#listTags.execute();
	}

	async thenTagShouldExposePublicData(slug: string, expected: { name: string; slug: string; color: TagColor }) {
		const tag = await this.#findTagBySlug.execute(slug);

		this.assert.deepEqual(
			{
				name: tag.props.name,
				slug: tag.props.slug,
				color: tag.props.color,
			},
			expected,
		);
	}
}
