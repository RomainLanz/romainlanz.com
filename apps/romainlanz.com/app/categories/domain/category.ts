import { Entity } from '#core/domain/entity';
import type { CategoryIdentifier } from './category_identifier.js';
import type { IllustrationName } from '@rlanz/design-system/illustration-name';

interface Properties {
	id: CategoryIdentifier;
	name: string;
	slug: string;
	illustrationName?: IllustrationName | null;
	articleCount?: number;
}

export class Category extends Entity<Properties> {
	static create(properties: Properties) {
		return new this(properties);
	}
}
