import { BaseCommand } from '@adonisjs/core/ace';
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

	async run() {
		const name = await this.prompt.ask('What is your name?');
		const email = await this.prompt.ask('What is your email?');
		const password = await this.prompt.secure('What is your password?');
		const role = await this.prompt.choice('What is your role?', [
			{
				name: UserRole.Admin.toString(),
				message: 'Admin',
			},
			{
				name: UserRole.User.toString(),
				message: 'User',
			},
		]);

		const hashedPassword = await hash.make(password);

		await db
			.insertInto('users')
			.values({
				id: UserIdentifier.generate().toString(),
				created_at: new Date(),
				name,
				email,
				role: Number(role),
				password: hashedPassword,
			})
			.execute();

		this.logger.success('User created successfully');
	}

	async completed() {
		await db.destroy();
	}
}
