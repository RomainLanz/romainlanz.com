import { client } from '@rlanz/rpc/client';
import { TuyauPlugin } from '@tuyau/inertia/vue';
import AdminLayout from '~/components/layouts/admin.vue';
import AppLayout from '~/components/layouts/app.vue';
import type { App, DefineComponent, Plugin } from 'vue';

export function initiateApplication(app: App, plugin: Plugin<[]>) {
	return app.use(plugin).use(TuyauPlugin, { client });
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
	} else {
		page.default.layout = AppLayout;
	}
}
