/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/reset.css';
import 'virtual:uno.css';
import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { createInertiaApp } from '@inertiajs/vue3';
import { TuyauPlugin } from '@tuyau/inertia/vue';
import { createSSRApp, h } from 'vue';
import { tuyau } from '~/app/tuyau';
import AppLayout from '~/components/layouts/app.vue';
import type { DefineComponent } from 'vue';

const appName = import.meta.env.VITE_APP_NAME || 'RomainLanz';

void createInertiaApp({
	progress: { color: '#5468FF' },

	title: (title) => (title ? `${title} - ${appName}` : appName),

	resolve: async (name) => {
		const page = await resolvePageComponent(
			`../pages/${name}.vue`,
			import.meta.glob<DefineComponent>('../pages/**/*.vue')
		);

		page.default.layout = page.default.layout || AppLayout;

		return page;
	},

	setup({ el, App, props, plugin }) {
		createSSRApp({ render: () => h(App, props) })
			.use(plugin)
			.use(TuyauPlugin, { client: tuyau })
			.mount(el);
	},
});
