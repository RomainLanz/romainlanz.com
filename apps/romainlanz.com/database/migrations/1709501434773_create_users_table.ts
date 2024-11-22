import { UserRole } from '#auth/enums/user_role';
import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('users')
		.addColumn('id', 'uuid', (col) => col.primaryKey())
		.addColumn('created_at', 'timestamptz', (col) => col.notNull())
		.addColumn('updated_at', 'timestamptz')
		.addColumn('name', 'text', (col) => col.notNull())
		.addColumn('email', 'text', (col) => col.notNull().unique())
		.addColumn('password', 'text', (col) => col.notNull())
		.addColumn('avatar_url', 'text')
		.addColumn('role', 'int2', (col) => col.notNull().defaultTo(UserRole.User))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('users').execute();
}
