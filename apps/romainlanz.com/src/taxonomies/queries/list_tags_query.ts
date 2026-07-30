import { db } from '#core/services/db';
import { Tag } from '#taxonomies/domain/tag';
import { parseTagColor } from '#taxonomies/domain/tag_color';
import { TagIdentifier } from '#taxonomies/domain/tag_identifier';

export class ListTagsQuery {
	async execute() {
		const tagRecords = await db.selectFrom('tags').select(['id', 'name', 'slug', 'color']).orderBy('name').execute();

		return tagRecords.map((tagRecord) => {
			return Tag.create({
				id: TagIdentifier.fromString(tagRecord.id),
				name: tagRecord.name,
				slug: tagRecord.slug,
				color: parseTagColor(tagRecord.color),
			});
		});
	}
}
