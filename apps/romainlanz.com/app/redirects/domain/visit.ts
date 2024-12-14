import { hash } from 'node:crypto';
import { Entity } from '#core/domain/entity';
import type { RedirectIdentifier } from '#redirects/domain/redirect_identifier';
import type { VisitIdentifier } from '#redirects/domain/visit_identifier';
import type { DateTime } from 'luxon';

interface Properties {
	id: VisitIdentifier;
	createdAt: DateTime;
	ipAddressRaw?: string;
	ipAddress?: string;
	referer: string;
	redirectId: RedirectIdentifier;
}

export class Visit extends Entity<Properties> {
	static create(properties: Properties) {
		const instance = new this(properties);

		if (properties.ipAddressRaw) {
			instance.props.ipAddress = hash(
				'md5',
				`${properties.ipAddressRaw}${properties.createdAt.toFormat('yyyy-MM-dd')}`
			);
		}

		return instance;
	}
}
