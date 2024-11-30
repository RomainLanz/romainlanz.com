import { Entity } from '#core/domain/entity';
import type { RedirectIdentifier } from '#redirects/domain/redirect_identifier';

interface Properties {
	id: RedirectIdentifier;
	slug: string;
	destination: string;
}

export class Redirect extends Entity<Properties> {
	static create(properties: Properties) {
		return new this(properties);
	}
}
