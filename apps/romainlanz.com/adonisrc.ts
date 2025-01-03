import { defineConfig } from '@adonisjs/core/app';

export default defineConfig({
	assetsBundler: false,

	hooks: {
		onBuildStarting: [() => import('@adonisjs/vite/build_hook')],
	},

	commands: [
		() => import('@adonisjs/core/commands'),
		() => import('@adonisjs/bouncer/commands'),
		() => import('@adonisjs/mail/commands'),
		() => import('@tuyau/core/commands'),
	],

	providers: [
		() => import('@adonisjs/core/providers/app_provider'),
		() => import('@adonisjs/core/providers/hash_provider'),
		{
			file: () => import('@adonisjs/core/providers/repl_provider'),
			environment: ['repl', 'test'],
		},
		() => import('./providers/app_provider.js'),
		() => import('@adonisjs/core/providers/edge_provider'),
		() => import('@adonisjs/vite/vite_provider'),
		() => import('@adonisjs/session/session_provider'),
		() => import('@adonisjs/shield/shield_provider'),
		() => import('@adonisjs/auth/auth_provider'),
		() => import('@adonisjs/core/providers/vinejs_provider'),
		() => import('@adonisjs/static/static_provider'),
		() => import('@adonisjs/i18n/i18n_provider'),
		() => import('@adonisjs/bouncer/bouncer_provider'),
		() => import('@adonisjs/mail/mail_provider'),
		() => import('@adonisjs/inertia/inertia_provider'),
		() => import('@tuyau/core/tuyau_provider'),
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
				files: ['tests/unit/**/*.spec(.ts|.js)'],
				name: 'unit',
				timeout: 2000,
			},
			{
				files: ['tests/functional/**/*.spec(.ts|.js)'],
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
