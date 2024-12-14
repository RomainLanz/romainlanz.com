import type { DateTime } from 'luxon';

export abstract class TimeServiceContract {
	abstract now(): DateTime;
}
