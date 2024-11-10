/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/reset.css';
import '~/custom_elements/alert_note';
import '~/custom_elements/codeblock';
import 'virtual:uno.css';
import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { createInertiaApp } from '@inertiajs/vue3';
import { createApp, createSSRApp, h } from 'vue';
import { initiateApplication, setLayout } from '~/app/helpers';
import type { DefineComponent } from 'vue';

import.meta.glob(['../../resources/favicon/**']);

const appName = import.meta.env.VITE_APP_NAME || 'RomainLanz';

void createInertiaApp({
	progress: { color: '#5468FF' },

	title: (title) => (title ? `${title} - ${appName}` : appName),

	resolve: async (name) => {
		const page = await resolvePageComponent(
			`../pages/${name}.vue`,
			import.meta.glob<DefineComponent>('../pages/**/*.vue')
		);

		setLayout(name, page);

		return page;
	},

	setup({ el, App, props, plugin }) {
		const app = props.initialPage.component.includes('admin')
			? createApp({ render: () => h(App, props) })
			: createSSRApp({ render: () => h(App, props) });

		initiateApplication(app, plugin).mount(el);
	},
});
