import { defineConfig } from '@adonisjs/inertia';
import { CurrentUserViewModel } from '#auth/view_models/current_user_view_model';
import type { InferSharedProps } from '@adonisjs/inertia/types';

const inertiaConfig = defineConfig({
	/**
	 * Path to the Edge view that will be used as the root view for Inertia responses
	 */
	rootView: 'inertia_layout',

	/**
	 * Data that should be shared with all rendered pages
	 */
	sharedData: {
		currentUser: (ctx) => CurrentUserViewModel.fromDomain(ctx.auth.user).serialize(),
		errors: (ctx) => ctx.session?.flashMessages.get('errors'),
	},

	/**
	 * Options for the server-side rendering
	 */
	ssr: {
		enabled: true,
		entrypoint: 'inertia/app/ssr.ts',
		pages(_ctx, page) {
			return !page.includes('admin') && !page.includes('pastes');
		},
	},
});

export default inertiaConfig;

declare module '@adonisjs/inertia/types' {
	export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
