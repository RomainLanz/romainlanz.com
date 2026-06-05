/// <reference path="../../../apps/romainlanz.com/adonisrc.ts" />

import { registry } from '@rlanz/site/registry';
import { createTuyau } from '@tuyau/core/client';

export const tuyau = createTuyau({
	registry,
	baseUrl: 'http://romainlanz.localhost:3333',
});
