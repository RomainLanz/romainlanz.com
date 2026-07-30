import { BaseCommand, flags } from '@adonisjs/core/ace';
import hash from '@adonisjs/core/services/hash';
import { UserIdentifier } from '#auth/domain/user_identifier';
import { UserRole } from '#auth/enums/user_role';
import { db } from '#core/services/db';
import type { CommandOptions } from '@adonisjs/core/types/ace';

export default class CreateUser extends BaseCommand {
	static commandName = 'create:user';
	static description = 'Create a new user';

	static options: CommandOptions = {
		startApp: true,
	};

	@flags.string({ description: 'User name' })
	declare name?: string;

	@flags.string({ description: 'User email' })
	declare email?: string;

	@flags.string({ description: 'User password' })
	declare password?: string;

	@flags.number({ description: 'User role' })
	declare role?: number;

	@flags.boolean({ description: 'Update the user when the email already exists' })
	declare update: boolean;

	async run() {
		const name = this.name ?? (await this.prompt.ask('What is your name?'));
		const email = this.email ?? (await this.prompt.ask('What is your email?'));
		const password = this.password ?? (await this.prompt.secure('What is your password?'));
		const role =
			this.role ??
			Number(
				await this.prompt.choice('What is your role?', [
					{
						name: UserRole.Admin.toString(),
						message: 'Admin',
					},
					{
						name: UserRole.User.toString(),
						message: 'User',
					},
				]),
			);

		if (!name || !email || !password) {
			this.logger.error('Name, email and password are required');
			this.exitCode = 1;
			return;
		}

		if (role !== UserRole.Admin && role !== UserRole.User) {
			this.logger.error(`Invalid user role "${role}"`);
			this.exitCode = 1;
			return;
		}

		const hashedPassword = await hash.make(password);

		let query = db.insertInto('users').values({
			id: UserIdentifier.generate().toString(),
			created_at: new Date(),
			name,
			email,
			role,
			password: hashedPassword,
		});

		if (this.update) {
			query = query.onConflict((conflict) =>
				conflict.column('email').doUpdateSet({
					name,
					password: hashedPassword,
					role,
					updated_at: new Date(),
				}),
			);
		}

		await query.execute();

		this.logger.success(this.update ? 'User created or updated successfully' : 'User created successfully');
	}

	async completed() {
		await db.destroy();
	}
}
