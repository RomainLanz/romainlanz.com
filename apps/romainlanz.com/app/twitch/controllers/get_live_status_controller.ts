import { inject } from '@adonisjs/core';
import { Twitch } from '#twitch/services/twitch';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class GetLiveStatusController {
	constructor(private twitch: Twitch) {}

	async render({ inertia }: HttpContext) {
		const isLive = await this.twitch.getLiveStatus();

		return inertia.render('twitch/live_status', { isLive });
	}
}
