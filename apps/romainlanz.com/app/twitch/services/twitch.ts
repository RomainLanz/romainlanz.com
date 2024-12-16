import cache from '@adonisjs/cache/services/main';
import { inject } from '@adonisjs/core';
import env from '#start/env';
import { TwitchAppTokenRetrieve } from '#twitch/services/twitch_app_token_retrieve';

@inject()
export class Twitch {
	constructor(private twitchAppTokenRetrieve: TwitchAppTokenRetrieve) {}

	async getLiveStatus() {
		const streamInfo = await cache.use('memory').getOrSet('twitch_stream_info', async () => {
			const token = await this.twitchAppTokenRetrieve.get();

			const response = await fetch('https://api.twitch.tv/helix/streams?user_login=romainlanz', {
				headers: {
					'Authorization': `Bearer ${token.release()}`,
					'Client-ID': env.get('TWITCH_CLIENT_ID'),
				},
			});

			const body = (await response.json()) as any;
			return body.data[0];
		});

		return !!streamInfo;
	}
}
