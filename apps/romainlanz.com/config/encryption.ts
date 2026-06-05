import env from '#start/env';
import { defineConfig, drivers } from '@adonisjs/core/encryption';

export default defineConfig({
	default: 'legacy',
	list: {
		legacy: drivers.legacy({
			keys: [env.get('APP_KEY')],
		}),
	},
});
