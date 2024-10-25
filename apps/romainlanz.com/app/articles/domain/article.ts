import { Entity } from '#core/domain/entity';
import type { ArticleIdentifier } from '#articles/domain/article_identifier';

interface Properties {
	id: ArticleIdentifier;
	publishedAt: Date | null;
	title: string;
	summary: string | null;
	slug: string;
	content: string | null;
}

export class Article extends Entity<Properties> {
	isPublished() {
		return this.props.publishedAt ? this.props.publishedAt > new Date() : false;
	}

	static create(properties: Properties) {
		return new this(properties);
	}
}
