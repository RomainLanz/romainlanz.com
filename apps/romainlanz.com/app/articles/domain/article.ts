import { Entity } from '#core/domain/entity';
import { DateTime } from 'luxon';
import type { ArticleIdentifier } from '#articles/domain/article_identifier';

interface Properties {
	id: ArticleIdentifier;
	publishedAt: DateTime | null;
	title: string;
	summary: string | null;
	slug: string;
	content: string | null;
}

export class Article extends Entity<Properties> {
	isPublished() {
		return this.props.publishedAt ? this.props.publishedAt > DateTime.now() : false;
	}

	static create(properties: Properties) {
		return new this(properties);
	}
}
