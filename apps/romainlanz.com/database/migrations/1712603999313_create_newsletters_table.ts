import { NewsletterSubscriptionStatus } from '#newsletter/enums/newsletter_subscription_status';
import { sql } from 'kysely';
import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('newsletters')
		.addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
		.addColumn('created_at', 'timestamp', (col) => col.notNull())
		.addColumn('email', 'varchar(255)', (col) => col.notNull())
		.addColumn('subscription_status', 'smallint', (col) =>
			col.notNull().defaultTo(NewsletterSubscriptionStatus.Pending)
		)
		.addColumn('unsubscribe_token', 'varchar(255)', (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('newsletters').execute();
}
