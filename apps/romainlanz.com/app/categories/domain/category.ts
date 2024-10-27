import { Entity } from '#core/domain/entity';
import type { CategoryIdentifier } from './category_identifier.js';

interface Properties {
	id: CategoryIdentifier;
	name: string;
	slug: string;
	illustrationName?: string;
}

export class Category extends Entity<Properties> {
	static create(properties: Properties) {
		return new this(properties);
	}
}
