import { defineConfig, drivers, store } from '@adonisjs/cache';
import { db } from '#core/services/db';
import type { InferStores } from '@adonisjs/cache/types';

const cacheConfig = defineConfig({
	default: 'default',

	stores: {
		memoryOnly: store().useL1Layer(drivers.memory()),

		default: store()
			.useL1Layer(drivers.memory())
			.useL2Layer(
				drivers.kysely({
					autoCreateTable: false,
					tableName: 'cache',
					connection: db,
				}),
			),
	},
});

export default cacheConfig;

declare module '@adonisjs/cache/types' {
	interface CacheStores extends InferStores<typeof cacheConfig> {}
}
