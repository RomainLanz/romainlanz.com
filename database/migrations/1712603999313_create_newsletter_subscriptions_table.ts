import { Kysely, sql } from 'kysely'
import { NewsletterSubscriptionStatus } from '#newsletter/enums/newsletter_subscription_status'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('newsletter_subscriptions')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('created_at', 'timestamp', (col) => col.notNull())
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('status', 'smallint', (col) =>
      col.notNull().defaultTo(NewsletterSubscriptionStatus.Pending)
    )
    .addColumn('unsubscribe_token', 'varchar(255)', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('newsletter_subscriptions').execute()
}
