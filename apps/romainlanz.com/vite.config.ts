import inertia from '@adonisjs/inertia/client';
import AdonisJS from '@adonisjs/vite/client';
import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.ts' } }),
		Vue(),
		AdonisJS({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] }),
		UnoCSS(),
	],

	resolve: {
		alias: {
			'~/': `${import.meta.dirname}/inertia/`,
		},
	},
});
