/// <reference path="../../../apps/romainlanz.com/adonisrc.ts" />

import { createTuyau } from '@tuyau/client';
import { api } from 'romainlanz.com/api';

export const tuyau = createTuyau({
	api,
	baseUrl: 'http://romainlanz.localhost:3333',
});
