import { BentoCache, bentostore } from 'bentocache';
import { kyselyDriver } from 'bentocache/drivers/kysely';
import { memoryDriver } from 'bentocache/drivers/memory';
import { db } from '#core/services/db';

import.meta.hot?.decline();

export const cache = new BentoCache({
	default: 'default',

	stores: {
		memoryOnly: bentostore().useL1Layer(memoryDriver()),

		default: bentostore()
			.useL1Layer(memoryDriver())
			.useL2Layer(
				kyselyDriver({
					autoCreateTable: false,
					tableName: 'cache',
					connection: db,
				})
			),
	},
});
