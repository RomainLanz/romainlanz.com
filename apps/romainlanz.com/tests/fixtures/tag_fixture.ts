import { FindTagBySlugQuery } from '#taxonomies/queries/find_tag_by_slug_query';
import { ListTagsQuery } from '#taxonomies/queries/list_tags_query';
import { TagRepository } from '#taxonomies/repositories/tag_repository';
import { DatabaseFixture } from '#tests/fixtures/database_fixture';
import type { Tag } from '#taxonomies/domain/tag';
import type { TagColor } from '@rlanz/design-system/tag-color';

interface TagAttributes {
	name: string;
	color: string;
	slug?: string;
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

	async whenICreateATag(attributes: TagAttributes) {
		const result = await this.#repository.create(attributes);

		if (!result.ok) {
			throw new Error(`Could not create Tag: ${result.error.type}`);
		}

		return result.value;
	}

	async whenIRenameTag(tag: Tag, attributes: TagAttributes) {
		const result = await this.#repository.update({
			id: tag.getIdentifier().toString(),
			...attributes,
		});

		if (!result.ok) {
			throw new Error(`Could not update Tag: ${result.error.type}`);
		}

		return result.value;
	}

	async whenIUpdateTag(tag: Tag, attributes: Required<TagAttributes>) {
		const result = await this.#repository.update({
			id: tag.getIdentifier().toString(),
			...attributes,
		});

		if (!result.ok) {
			throw new Error(`Could not update Tag: ${result.error.type}`);
		}

		return result.value;
	}

	async whenIListTags() {
		return this.#listTags.execute();
	}

	async thenTagShouldExposePublicData(slug: string, expected: { name: string; slug: string; color: TagColor }) {
		const result = await this.#findTagBySlug.execute(slug);

		if (!result.ok) {
			throw new Error(`Expected Tag "${slug}" to exist`);
		}

		this.assert.deepEqual(
			{
				name: result.value.props.name,
				slug: result.value.props.slug,
				color: result.value.props.color,
			},
			expected,
		);
	}
}
