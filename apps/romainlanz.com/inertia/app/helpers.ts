import AdminLayout from '~/components/layouts/admin.vue';
import AppLayout from '~/components/layouts/app.vue';
import type { App, DefineComponent, Plugin } from 'vue';

export function initiateApplication(app: App, plugin: Plugin<[]>) {
	return app.use(plugin);
}

export function setLayout(name: string, page: DefineComponent) {
	if (!page.default) {
		throw new Error(`Page ${name} does not have a default export`);
	}

	if (page.default.layout) {
		return;
	}

	if (name.includes('admin')) {
		page.default.layout = AdminLayout;
	} else if (name.includes('pastes')) {
	} else {
		page.default.layout = AppLayout;
	}
}
