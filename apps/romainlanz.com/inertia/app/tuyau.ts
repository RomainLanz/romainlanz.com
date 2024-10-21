/// <reference path="../../adonisrc.ts" />

import { createTuyau } from '@tuyau/client';
import { api } from '../../.adonisjs/api';

export const tuyau = createTuyau({
	api,
	baseUrl: 'http://romainlanz.localhost:3333',
});
