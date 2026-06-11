import { RecordNotFoundException } from '#core/exceptions/record_not_found_exception';
import { db } from '#core/services/db';
import { generateSlug } from '#core/slug';
import { Tag } from '#taxonomies/domain/tag';
import { parseTagColor } from '#taxonomies/domain/tag_color';
import { TagIdentifier } from '#taxonomies/domain/tag_identifier';

interface CreateTagDTO {
	name: string;
	color: string;
}

interface UpdateTagDTO {
	id: string;
	name: string;
	color: string;
}

export class TagRepository {
	async create(payload: CreateTagDTO) {
		const color = parseTagColor(payload.color);
		const baseSlug = generateSlug(payload.name) || 'tag';
		let suffix = 1;

		while (true) {
			const slug = suffix === 1 ? baseSlug : `${baseSlug}-${suffix}`;
			const id = TagIdentifier.generate();

			try {
				await db
					.insertInto('tags')
					.values({
						id: id.toString(),
						name: payload.name,
						slug,
						color,
					})
					.execute();

				return Tag.create({
					id,
					name: payload.name,
					slug,
					color,
				});
			} catch (error) {
				if (!isTagSlugUniqueConstraintViolation(error)) {
					throw error;
				}

				suffix += 1;
			}
		}
	}

	async update(payload: UpdateTagDTO) {
		const color = parseTagColor(payload.color);
		const existingTag = await db
			.selectFrom('tags')
			.select(['id', 'slug'])
			.where('id', '=', payload.id)
			.executeTakeFirst();

		if (!existingTag) {
			throw new RecordNotFoundException();
		}

		await db
			.updateTable('tags')
			.set({
				name: payload.name,
				color,
			})
			.where('id', '=', payload.id)
			.execute();

		return Tag.create({
			id: TagIdentifier.fromString(existingTag.id),
			name: payload.name,
			slug: existingTag.slug,
			color,
		});
	}
}

function isTagSlugUniqueConstraintViolation(error: unknown) {
	return (
		typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		error.code === '23505' &&
		'constraint' in error &&
		error.constraint === 'tags_slug_unique'
	);
}
