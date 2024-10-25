import { createInertiaApp } from '@inertiajs/vue3';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, h, type DefineComponent } from 'vue';
import { initiateApplication, setLayout } from '~/app/helpers';

export default function render(page: any) {
	return createInertiaApp({
		page,
		render: renderToString,
		resolve: (name) => {
			const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue', { eager: true });
			const page = pages[`../pages/${name}.vue`];

			setLayout(name, page);

			return page;
		},

		setup({ App, props, plugin }) {
			const app = createSSRApp({ render: () => h(App, props) });

			return initiateApplication(app, plugin);
		},
	});
}
