import { migrateDatabase, truncateDatabase } from '#tests/database_test_utils';
import { BaseFixture } from '#tests/fixtures/base_fixture';

export class DatabaseFixture extends BaseFixture {
	async resetDatabase() {
		await migrateDatabase();
		await truncateDatabase();
	}
}
