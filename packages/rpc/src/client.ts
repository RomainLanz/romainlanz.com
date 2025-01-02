import { api } from '@rlanz/site/api';
import { createTuyau } from '@tuyau/client';

export const client = createTuyau({
	api,
	baseUrl: globalThis.RomainLanz.appUrl,
});
