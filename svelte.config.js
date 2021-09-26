import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [mdsvex({ extensions: ['.svelte.md', '.md', '.svx'] }), preprocess()],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#app'
	}
};

export default config;
