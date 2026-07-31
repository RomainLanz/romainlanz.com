import cache from '@adonisjs/cache/services/main';
import { Secret } from '@adonisjs/core/helpers';
import app from '@adonisjs/core/services/app';
import { test } from '@japa/runner';
import env from '#start/env';
import { Twitch } from '#twitch/services/twitch';
import { TwitchAppTokenRetrieve } from '#twitch/services/twitch_app_token_retrieve';

class FakeTwitchAppTokenRetrieve {
	async get() {
		return new Secret('app-token');
	}
}

test.group('Twitch services', (group) => {
	const originalFetch = globalThis.fetch;

	group.each.setup(async () => {
		await cache.delete({ key: 'twitch_app_token', suppressL2Errors: true });
		await cache.use('memoryOnly').delete({ key: 'twitch_stream_info' });
	});

	group.each.teardown(async () => {
		globalThis.fetch = originalFetch;
		app.container.restore(TwitchAppTokenRetrieve);
		await cache.delete({ key: 'twitch_app_token', suppressL2Errors: true });
		await cache.use('memoryOnly').delete({ key: 'twitch_stream_info' });
	});

	test('retrieves and caches an application access token', async ({ assert }) => {
		let requestUrl: string | URL | Request | undefined;
		let requestInit: RequestInit | undefined;
		let requestCount = 0;

		globalThis.fetch = (async (input, init) => {
			requestUrl = input;
			requestInit = init;
			requestCount++;

			return Response.json({
				access_token: 'app-token',
				expires_in: 3_600,
				token_type: 'bearer',
			});
		}) as typeof fetch;

		const service = await app.container.make(TwitchAppTokenRetrieve);
		const firstToken = await service.get();
		const cachedToken = await service.get();

		assert.equal(requestUrl, 'https://id.twitch.tv/oauth2/token');
		assert.equal(requestInit?.method, 'POST');
		assert.deepEqual(requestInit?.headers, { 'Content-Type': 'application/json' });
		const requestBody = JSON.parse(requestInit?.body as string);
		assert.equal(requestBody.client_id, env.get('TWITCH_CLIENT_ID'));
		assert.isTrue(requestBody.client_secret === env.get('TWITCH_CLIENT_SECRET'));
		assert.equal(requestBody.grant_type, 'client_credentials');
		assert.equal(firstToken.release(), 'app-token');
		assert.equal(cachedToken.release(), 'app-token');
		assert.equal(requestCount, 1);
	});

	test('retrieves and caches the live status from Twitch Helix', async ({ assert }) => {
		let requestUrl: string | URL | Request | undefined;
		let requestInit: RequestInit | undefined;
		let requestCount = 0;

		globalThis.fetch = (async (input, init) => {
			requestUrl = input;
			requestInit = init;
			requestCount++;

			return Response.json({ data: [{ id: 'stream-id' }] });
		}) as typeof fetch;
		app.container.swap(TwitchAppTokenRetrieve, () => new FakeTwitchAppTokenRetrieve() as TwitchAppTokenRetrieve);

		const service = await app.container.make(Twitch);
		const firstStatus = await service.getLiveStatus();
		const cachedStatus = await service.getLiveStatus();

		assert.equal(requestUrl, 'https://api.twitch.tv/helix/streams?user_login=romainlanz');
		assert.deepEqual(requestInit?.headers, {
			Authorization: 'Bearer app-token',
			'Client-ID': env.get('TWITCH_CLIENT_ID'),
		});
		assert.isTrue(firstStatus);
		assert.isTrue(cachedStatus);
		assert.equal(requestCount, 1);
	});
});
