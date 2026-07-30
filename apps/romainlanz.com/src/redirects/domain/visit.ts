import { Entity } from '#core/domain/entity';
import type { RedirectIdentifier } from '#redirects/domain/redirect_identifier';
import type { VisitIdentifier } from '#redirects/domain/visit_identifier';
import type { DateTime } from 'luxon';

interface Properties {
	id: VisitIdentifier;
	createdAt: DateTime;
	uniqueHash: string;
	referer: string;
	redirectId: RedirectIdentifier;
}

export class Visit extends Entity<Properties> {
	static create(properties: Properties) {
		return new this(properties);
	}
}
