import { BaseCommand, args } from '@adonisjs/core/ace';
import hash from '@adonisjs/core/services/hash';
import { UserIdentifier } from '#auth/domain/user_identifier';
import { db } from '#core/services/db';
import type { CommandOptions } from '@adonisjs/core/types/ace';

export default class CreateUser extends BaseCommand {
	static commandName = 'create:user';
	static description = 'Create a new user';

	static options: CommandOptions = {
		startApp: true,
	};

	@args.string()
	declare name: string;

	@args.string()
	declare email: string;

	async run() {
		this.logger.info(`Creating user ${this.email} with password "secret"`);

		const hashedPassword = await hash.make('secret');

		await db
			.insertInto('users')
			.values({
				id: UserIdentifier.generate().toString(),
				created_at: new Date(),
				name: this.name,
				email: this.email,
				password: hashedPassword,
			})
			.execute();

		this.logger.success('User created successfully');
	}

	async completed() {
		await db.destroy();
	}
}
