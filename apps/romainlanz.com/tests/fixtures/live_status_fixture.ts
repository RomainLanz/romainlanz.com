import app from '@adonisjs/core/services/app';
import { Twitch } from '#twitch/services/twitch';

export class FakeTwitch {
	#fails = false;
	#isLive = false;

	alwaysFail() {
		this.#fails = true;
	}

	goLive() {
		this.#isLive = true;
	}

	async getLiveStatus() {
		if (this.#fails) {
			throw new Error('Twitch is unavailable');
		}

		return this.#isLive;
	}
}

export class LiveStatusFixture {
	cleanup() {
		app.container.restore(Twitch);
	}

	givenTwitchIsAvailable() {
		const twitch = new FakeTwitch();

		app.container.swap(Twitch, () => twitch as unknown as Twitch);

		return twitch;
	}
}
