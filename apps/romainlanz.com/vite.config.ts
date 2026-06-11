import inertia from '@adonisjs/inertia/vite';
import AdonisJS from '@adonisjs/vite/client';
import TailwindCSS from '@tailwindcss/vite';
import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		inertia({ ssr: { enabled: true, entrypoint: 'inertia/ssr.ts' } }),
		Vue(),
		AdonisJS({ entrypoints: ['inertia/app.ts'], reload: ['resources/views/**/*.edge'] }),
		TailwindCSS(),
	],

	resolve: {
		alias: {
			'~/': `${import.meta.dirname}/inertia/`,
			'@generated': `${import.meta.dirname}/.adonisjs/client/`,
		},
	},
});
