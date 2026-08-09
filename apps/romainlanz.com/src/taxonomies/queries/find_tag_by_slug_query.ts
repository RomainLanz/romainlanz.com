import { err, ok, type Result } from '#core/result';
import { db } from '#shared/services/db';
import { Tag } from '#taxonomies/domain/tag';
import { parseTagColor } from '#taxonomies/domain/tag_color';
import { TagIdentifier } from '#taxonomies/domain/tag_identifier';

export type FindTagBySlugError = {
	type: 'tag_not_found';
};

export class FindTagBySlugQuery {
	async execute(slug: string): Promise<Result<Tag, FindTagBySlugError>> {
		const tagRecord = await db
			.selectFrom('tags')
			.select(['id', 'name', 'slug', 'color'])
			.where('slug', '=', slug)
			.executeTakeFirst();

		if (!tagRecord) {
			return err({ type: 'tag_not_found' });
		}

		return ok(
			Tag.create({
				id: TagIdentifier.fromString(tagRecord.id),
				name: tagRecord.name,
				slug: tagRecord.slug,
				color: parseTagColor(tagRecord.color),
			}),
		);
	}
}
