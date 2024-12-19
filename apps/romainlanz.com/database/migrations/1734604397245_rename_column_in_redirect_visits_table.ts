import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('redirect_visits').dropConstraint('redirect_visits_ip_address_key').execute();

	await db.schema.alterTable('redirect_visits').renameColumn('ip_address', 'unique_hash').execute();

	await db.schema
		.alterTable('redirect_visits')
		.addUniqueConstraint('redirect_visits_unique_hash_key', ['unique_hash'])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('redirect_visits').dropConstraint('redirect_visits_unique_hash_key').execute();

	await db.schema.alterTable('redirect_visits').renameColumn('unique_hash', 'ip_address').execute();

	await db.schema
		.alterTable('redirect_visits')
		.addUniqueConstraint('redirect_visits_ip_address_key', ['ip_address'])
		.execute();
}
