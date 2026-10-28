import AdonisJS from '@adonisjs/vite/client';
import TailwindCSS from '@tailwindcss/vite';
import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		Vue(),
		AdonisJS({
			entryPoints: ['inertia/app.ts'],
			serverEntryPoints: ['inertia/ssr.ts'],
			// Files referenced from Edge templates with asset(), so they need a manifest entry.
			assets: {
				assets: [
					'resources/favicon/apple-touch-icon.png',
					'resources/favicon/favicon-96x96.png',
					'resources/favicon/favicon.ico',
					'resources/favicon/favicon.svg',
				],
			},
			reload: ['resources/views/**/*.edge'],
		}),
		TailwindCSS(),
	],
	server: {
		allowedHosts: ['.e2b.app', '.onamp.dev'],
	},

	resolve: {
		alias: {
			'~/': `${import.meta.dirname}/inertia/`,
			'@generated': `${import.meta.dirname}/.adonisjs/client/`,
		},
	},
});
