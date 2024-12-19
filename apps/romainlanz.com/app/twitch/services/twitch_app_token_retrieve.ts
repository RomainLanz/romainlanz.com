import { Secret } from '@adonisjs/core/helpers';
import vine from '@vinejs/vine';
import { cache } from '#core/services/cache';
import env from '#start/env';

export class TwitchAppTokenRetrieve {
	static validator = vine.compile(
		vine.object({
			access_token: vine.string(),
			expires_in: vine.number(),
			token_type: vine.string(),
		})
	);

	async get() {
		const token = await cache.getOrSet(
			'twitch_app_token',
			async () => {
				const response = await fetch('https://id.twitch.tv/oauth2/token', {
					method: 'POST',
					body: JSON.stringify({
						client_id: env.get('TWITCH_CLIENT_ID'),
						client_secret: env.get('TWITCH_CLIENT_SECRET'),
						grant_type: 'client_credentials',
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				const body = await response.json();
				const data = await TwitchAppTokenRetrieve.validator.validate(body);

				return data.access_token;
			},
			{
				ttl: 2_147_483_646,
			}
		);

		return new Secret(token);
	}
}
