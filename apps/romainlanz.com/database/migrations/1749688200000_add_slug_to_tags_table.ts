import { generateSlug } from '#core/slug';
import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('tags').addColumn('slug', 'text').execute();

	const tags = await db.selectFrom('tags').select(['id', 'name']).orderBy('name').orderBy('id').execute();
	const slugs = new Set<string>();

	for (const tag of tags) {
		const baseSlug = generateSlug(tag.name) || 'tag';
		let slug = baseSlug;
		let suffix = 2;

		while (slugs.has(slug)) {
			slug = `${baseSlug}-${suffix}`;
			suffix += 1;
		}

		await db.updateTable('tags').set({ slug }).where('id', '=', tag.id).execute();
		slugs.add(slug);
	}

	await db.schema
		.alterTable('tags')
		.alterColumn('slug', (col) => col.setNotNull())
		.execute();
	await db.schema.alterTable('tags').addUniqueConstraint('tags_slug_unique', ['slug']).execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('tags').dropConstraint('tags_slug_unique').execute();
	await db.schema.alterTable('tags').dropColumn('slug').execute();
}
