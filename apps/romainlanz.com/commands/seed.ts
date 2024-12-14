import { BaseCommand } from '@adonisjs/core/ace';
import { db } from '#core/services/db';
import { CategoryIdentifier } from '#taxonomies/domain/category_identifier';
import type { CommandOptions } from '@adonisjs/core/types/ace';

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
				{
					id: CategoryIdentifier.generate().toString(),
					name: 'AdonisJS',
					slug: 'adonisjs',
					illustration_name: 'adonisjs',
				},
				{
					id: CategoryIdentifier.generate().toString(),
					name: 'Base de données',
					slug: 'database',
					illustration_name: 'database',
				},
				{
					id: CategoryIdentifier.generate().toString(),
					name: 'Design Pattern',
					slug: 'design-pattern',
					illustration_name: 'design-pattern',
				},
				{
					id: CategoryIdentifier.generate().toString(),
					name: 'JavaScript',
					slug: 'javascript',
					illustration_name: 'javascript',
				},
				{
					id: CategoryIdentifier.generate().toString(),
					name: 'Productivité',
					slug: 'productivity',
					illustration_name: 'productivity',
				},
				{ id: CategoryIdentifier.generate().toString(), name: 'React', slug: 'react', illustration_name: 'react' },
				{ id: CategoryIdentifier.generate().toString(), name: 'VueJS', slug: 'vuejs', illustration_name: 'vuejs' },
			])
			.execute();
	}
}
