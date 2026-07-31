import { DateTime } from 'luxon';
import type { TimeServiceContract } from '#core/contracts/time_service_contract';

export class TimeService implements TimeServiceContract {
	now() {
		return DateTime.now();
	}
}
