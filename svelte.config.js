import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';

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
		target: '#app'
	}
};

export default config;
