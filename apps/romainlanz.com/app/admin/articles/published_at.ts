import { DateTime } from 'luxon';

const SITE_TIMEZONE = 'Europe/Zurich';

export function parsePublishedAt(value: string | undefined) {
	if (!value) {
		return null;
	}

	const date = DateTime.fromISO(value, { zone: SITE_TIMEZONE });

	if (!date.isValid) {
		return null;
	}

	return date.toJSDate();
}
