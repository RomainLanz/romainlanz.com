import { defineConfig } from '@adonisjs/core/http';
import app from '@adonisjs/core/services/app';
import env from '#start/env';

/**
 * The app key is used for encrypting cookies, generating signed URLs,
 * and by the "encryption" module.
 *
 * The encryption module will fail to decrypt data if the key is lost or
 * changed. Therefore, it is recommended to keep the app key secure.
 */
export const appKey = env.get('APP_KEY');

export const appUrl = env.get('APP_URL');

/**
 * The configuration settings used by the HTTP server
 */
export const http = defineConfig({
	generateRequestId: true,
	allowMethodSpoofing: true,

	/**
	 * Enabling async local storage will let you access HTTP context
	 * from anywhere inside your application.
	 */
	useAsyncLocalStorage: true,

	/**
	 * Manage cookies configuration. The settings for the session id cookie are
	 * defined inside the "config/session.ts" file.
	 */
	cookie: {
		domain: '',
		path: '/',
		maxAge: '2h',
		httpOnly: true,
		secure: app.inProduction,
		sameSite: 'lax',
	},
});
