import type { TimeServiceContract } from '#core/contracts/time_service_contract';
import type { DateTime } from 'luxon';

export class TimeFreezeService implements TimeServiceContract {
	readonly #time: DateTime;

	constructor(time: DateTime) {
		this.#time = time;
	}

	now() {
		return this.#time;
	}
}
