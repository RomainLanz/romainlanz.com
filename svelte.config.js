import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],

	preprocess: [
		mdsvex({
			extensions: ['.svx'],
			layout: './src/lib/components/BlogLayout.svelte'
		}),
		preprocess({
			typescript: {},
			scss: {}
		})
	],

	kit: {
		adapter: adapter(),
		target: '#app'
	}
};

export default config;
