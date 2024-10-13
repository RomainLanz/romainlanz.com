import { inject } from '@adonisjs/core';
import { Twitch } from '#twitch/services/twitch';
import { LiveStatus } from '#views/partials/live_status';

@inject()
export default class GetLiveStatusController {
	constructor(private twitch: Twitch) {}

	async render() {
		const isLive = await this.twitch.getLiveStatus();

		return <LiveStatus isLive={isLive} />;
	}
}
