import { defineConfig } from '@adonisjs/inertia';

const inertiaConfig = defineConfig({
	/**
	 * Path to the Edge view that will be used as the root view for Inertia responses
	 */
	rootView: 'inertia_layout',

	/**
	 * Options for the server-side rendering
	 */
	ssr: {
		enabled: true,
		entrypoint: 'inertia/ssr.ts',
		pages(_ctx, page) {
			return !page.includes('admin') && !page.includes('pastes');
		},
	},
});

export default inertiaConfig;
