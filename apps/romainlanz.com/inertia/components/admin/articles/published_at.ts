import { DateTime } from 'luxon';

const SITE_TIMEZONE = 'Europe/Zurich';
const DATETIME_LOCAL_FORMAT = "yyyy-MM-dd'T'HH:mm";

export function toDatetimeLocalInputValue(value: string | Date | null) {
	if (!value) {
		return '';
	}

	const date = typeof value === 'string' ? DateTime.fromISO(value) : DateTime.fromJSDate(value);

	if (!date.isValid) {
		return '';
	}

	return date.setZone(SITE_TIMEZONE).toFormat(DATETIME_LOCAL_FORMAT);
}
