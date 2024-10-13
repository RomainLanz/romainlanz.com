import { BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
import { db } from '#core/services/db';

export default class Seed extends BaseCommand {
	static commandName = 'seed';
	static description = 'Seed database';

	static options: CommandOptions = {
		startApp: true,
	};

	async run() {
		// Seed categories
		// TODO: Check if categories already exist
		await db
			.insertInto('categories')
			.values([
				{ name: 'AdonisJS', slug: 'adonisjs' },
				{ name: 'Base de données', slug: 'database' },
				{ name: 'Design Pattern', slug: 'design-pattern' },
				{ name: 'JavaScript', slug: 'javascript' },
				{ name: 'Productivité', slug: 'productivity' },
				{ name: 'React', slug: 'react' },
				{ name: 'VueJS', slug: 'vuejs' },
			])
			.execute();
	}
}
