import { registry } from '@rlanz/site/registry';
import { createTuyau } from '@tuyau/core/client';

export const client = createTuyau({
	registry,
	baseUrl: globalThis.RomainLanz.appUrl,
});
