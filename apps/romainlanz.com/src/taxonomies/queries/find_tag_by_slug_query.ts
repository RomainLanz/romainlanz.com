import { RecordNotFoundException } from '#core/exceptions/record_not_found_exception';
import { db } from '#core/services/db';
import { Tag } from '#taxonomies/domain/tag';
import { parseTagColor } from '#taxonomies/domain/tag_color';
import { TagIdentifier } from '#taxonomies/domain/tag_identifier';

export class FindTagBySlugQuery {
	async execute(slug: string) {
		const tagRecord = await db
			.selectFrom('tags')
			.select(['id', 'name', 'slug', 'color'])
			.where('slug', '=', slug)
			.executeTakeFirst();

		if (!tagRecord) {
			throw new RecordNotFoundException();
		}

		return Tag.create({
			id: TagIdentifier.fromString(tagRecord.id),
			name: tagRecord.name,
			slug: tagRecord.slug,
			color: parseTagColor(tagRecord.color),
		});
	}
}
