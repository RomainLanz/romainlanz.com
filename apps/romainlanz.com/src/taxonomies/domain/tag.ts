import { Entity } from '#core/domain/entity';
import type { TagIdentifier } from '#taxonomies/domain/tag_identifier';
import type { TagColor } from '@rlanz/design-system/tag-color';

interface Properties {
	id: TagIdentifier;
	name: string;
	slug: string;
	color: TagColor;
}

export class Tag extends Entity<Properties> {
	static create(properties: Properties) {
		return new this(properties);
	}
}
