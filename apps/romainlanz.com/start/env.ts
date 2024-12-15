/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env';

export default await Env.create(new URL('../', import.meta.url), {
	// Node
	TZ: Env.schema.string(),
	PORT: Env.schema.number(),
	HOST: Env.schema.string({ format: 'host' }),
	NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),

	// App
	LOG_LEVEL: Env.schema.string(),
	APP_KEY: Env.schema.string(),
	APP_URL: Env.schema.string(),
	REDIRECT_DOMAIN: Env.schema.string(),

	// Session
	SESSION_DRIVER: Env.schema.enum(['cookie', 'memory'] as const),

	// Database
	DB_HOST: Env.schema.string({ format: 'host' }),
	DB_PORT: Env.schema.number(),
	DB_USER: Env.schema.string(),
	DB_PASSWORD: Env.schema.string.optional(),
	DB_DATABASE: Env.schema.string(),

	// Twitch
	TWITCH_CLIENT_ID: Env.schema.string(),
	TWITCH_CLIENT_SECRET: Env.schema.string(),

	// Mail
	MAIL_DRIVER: Env.schema.enum(['smtp', 'brevo'] as const),
	SMTP_HOST: Env.schema.string(),
	SMTP_PORT: Env.schema.string(),
	BREVO_API_KEY: Env.schema.string(),
});
