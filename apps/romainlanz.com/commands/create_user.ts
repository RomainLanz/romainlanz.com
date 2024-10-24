import { BaseCommand, args } from '@adonisjs/core/ace';
import hash from '@adonisjs/core/services/hash';
import { db } from '#core/services/db';
import type { CommandOptions } from '@adonisjs/core/types/ace';

export default class CreateUser extends BaseCommand {
	static commandName = 'create:user';
	static description = 'Create a new user';

	static options: CommandOptions = {
		startApp: true,
	};

	@args.string()
	declare email: string;

	async run() {
		this.logger.info(`Creating user ${this.email} with password "secret"`);

		const hashedPassword = await hash.make('secret');

		await db
			.insertInto('users')
			.values({ email: this.email, password: hashedPassword, created_at: new Date(), updated_at: new Date() })
			.execute();

		this.logger.success('User created successfully');
	}
}
