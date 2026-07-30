import { Entity } from '#core/domain/entity';
import type { PasteIdentifier } from '#paste/domain/paste_identifier';

interface Properties {
	id: PasteIdentifier;
	content: string;
}

export class Paste extends Entity<Properties> {
	static create(properties: Properties) {
		return new this(properties);
	}
}
