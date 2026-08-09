import { err, ok, type Result } from '#core/result';
import { generateSlug } from '#core/slug';
import { db } from '#shared/services/db';
import { Tag } from '#taxonomies/domain/tag';
import { parseTagColor } from '#taxonomies/domain/tag_color';
import { TagIdentifier } from '#taxonomies/domain/tag_identifier';

interface CreateTagDTO {
	name: string;
	color: string;
	slug?: string;
}

interface UpdateTagDTO {
	id: string;
	name: string;
	color: string;
}

export type CreateTagRepositoryError = { type: 'tag_name_already_exists' } | { type: 'tag_slug_already_exists' };

export class TagRepository {
	async create(payload: CreateTagDTO): Promise<Result<Tag, CreateTagRepositoryError>> {
		const color = parseTagColor(payload.color);
		const customSlug = payload.slug?.trim() || undefined;
		const baseSlug = customSlug || generateSlug(payload.name) || 'tag';
		let suffix = 1;

		while (true) {
			const slug = customSlug || (suffix === 1 ? baseSlug : `${baseSlug}-${suffix}`);
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
			} catch (error) {
				if (isUniqueConstraintViolation(error, 'tags_name_key')) {
					return err({ type: 'tag_name_already_exists' });
				}

				if (!isTagSlugUniqueConstraintViolation(error)) {
					throw error;
				}

				if (customSlug) {
					return err({ type: 'tag_slug_already_exists' });
				}

				suffix += 1;
				continue;
			}

			return ok(
				Tag.create({
					id,
					name: payload.name,
					slug,
					color,
				}),
			);
		}
	}

	async update(payload: UpdateTagDTO): Promise<Tag | null> {
		const color = parseTagColor(payload.color);
		const updatedTag = await db
			.updateTable('tags')
			.set({
				name: payload.name,
				color,
			})
			.where('id', '=', payload.id)
			.returning(['id', 'slug'])
			.executeTakeFirst();

		if (!updatedTag) {
			return null;
		}

		return Tag.create({
			id: TagIdentifier.fromString(updatedTag.id),
			name: payload.name,
			slug: updatedTag.slug,
			color,
		});
	}
}

function isTagSlugUniqueConstraintViolation(error: unknown) {
	return isUniqueConstraintViolation(error, 'tags_slug_unique');
}

function isUniqueConstraintViolation(error: unknown, constraint: string) {
	return (
		typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		error.code === '23505' &&
		'constraint' in error &&
		error.constraint === constraint
	);
}
