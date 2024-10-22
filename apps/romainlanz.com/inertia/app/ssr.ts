import { createInertiaApp } from '@inertiajs/vue3';
import { client } from '@rlanz/rpc/client';
import { TuyauPlugin } from '@tuyau/inertia/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, h, type DefineComponent } from 'vue';
import AppLayout from '~/components/layouts/app.vue';

export default function render(page: any) {
	return createInertiaApp({
		page,
		render: renderToString,
		resolve: (name) => {
			const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue', { eager: true });
			const page = pages[`../pages/${name}.vue`];

			page.default.layout = page.default.layout || AppLayout;

			return page;
		},

		setup({ App, props, plugin }) {
			return createSSRApp({ render: () => h(App, props) })
				.use(plugin)
				.use(TuyauPlugin, { client });
		},
	});
}
