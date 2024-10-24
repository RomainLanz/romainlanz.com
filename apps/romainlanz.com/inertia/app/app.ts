/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/reset.css';
import 'virtual:uno.css';
import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { createInertiaApp } from '@inertiajs/vue3';
import { client } from '@rlanz/rpc/client';
import { TuyauPlugin } from '@tuyau/inertia/vue';
import { createApp, createSSRApp, h } from 'vue';
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
		const app = props.initialPage.component.includes('admin')
			? createApp({ render: () => h(App, props) })
			: createSSRApp({ render: () => h(App, props) });

		app.use(plugin).use(TuyauPlugin, { client }).mount(el);
	},
});
