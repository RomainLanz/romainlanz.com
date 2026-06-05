import { indexPolicies } from '@adonisjs/bouncer';
import { indexEntities } from '@adonisjs/core';
import { defineConfig } from '@adonisjs/core/app';
import { indexPages } from '@adonisjs/inertia';
import { generateRegistry } from '@tuyau/core/hooks';

export default defineConfig({
	hooks: {
		init: [
			indexPages({ framework: 'vue3' }),
			indexEntities({
				controllers: {
					enabled: true,
					source: './app',
					glob: ['**/*_controller.ts'],
					importAlias: '#app',
				},
				transformers: {
					enabled: true,
					source: './app',
					glob: ['**/*_transformer.ts'],
					importAlias: '#app',
					withSharedProps: true,
				},
			}),
			indexPolicies(),
			generateRegistry(),
		],
		buildStarting: [() => import('@adonisjs/vite/build_hook')],
	},

	commands: [
		() => import('@adonisjs/core/commands'),
		() => import('@adonisjs/bouncer/commands'),
		() => import('@adonisjs/mail/commands'),
	],

	providers: [
		() => import('@adonisjs/core/providers/app_provider'),
		() => import('@adonisjs/core/providers/hash_provider'),
		{
			file: () => import('@adonisjs/core/providers/repl_provider'),
			environment: ['repl', 'test'],
		},
		() => import('@adonisjs/static/static_provider'),
		() => import('./providers/app_provider.js'),
		() => import('@adonisjs/core/providers/edge_provider'),
		() => import('@adonisjs/vite/vite_provider'),
		() => import('@adonisjs/session/session_provider'),
		() => import('@adonisjs/shield/shield_provider'),
		() => import('@adonisjs/auth/auth_provider'),
		() => import('@adonisjs/core/providers/vinejs_provider'),
		() => import('@adonisjs/i18n/i18n_provider'),
		() => import('@adonisjs/bouncer/bouncer_provider'),
		() => import('@adonisjs/mail/mail_provider'),
		() => import('@adonisjs/inertia/inertia_provider'),
	],

	preloads: [
		() => import('#start/routes'),
		() => import('#start/kernel'),
		() => import('#start/events'),
		() => import('#start/global'),
		() => import('#start/vine'),
	],

	tests: {
		suites: [
			{
				files: ['tests/unit/**/*.spec.{ts,js}'],
				name: 'unit',
				timeout: 2000,
			},
			{
				files: ['tests/functional/**/*.spec.{ts,js}'],
				name: 'functional',
				timeout: 30_000,
			},
		],
		forceExit: false,
	},

	metaFiles: [
		{
			pattern: 'resources/views/**/*.edge',
			reloadServer: false,
		},
		{
			pattern: 'resources/**/*.svg',
			reloadServer: false,
		},
		{
			pattern: 'public/**',
			reloadServer: false,
		},
		{
			pattern: 'resources/lang/**/*.{json,yaml,yml}',
			reloadServer: false,
		},
	],
});
