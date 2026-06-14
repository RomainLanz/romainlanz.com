import { defineConfig } from '@monocle.sh/adonisjs-agent';
import env from '#start/env';

export default defineConfig({
	/**
	 * Enable Monocle Studio for local development.
	 * @see https://docs.monocle.sh/studio/overview
	 */
	dev: process.env.NODE_ENV === 'development',
	apiKey: env.get('MONOCLE_API_KEY'),

	serviceName: env.get('APP_NAME'),
	serviceVersion: env.get('APP_VERSION'),
	environment: env.get('APP_ENV'),
});
