import type { Article } from '#articles/domain/article';
import type { DateTime } from 'luxon';

export type AllArticleViewModelSerialized = ReturnType<AllArticleViewModel['serialize']>;

export class AllArticleViewModel {
	constructor(
		private articles: Article[],
		private now: DateTime
	) {}

	static fromDomain(articles: Article[], now: DateTime) {
		return new this(articles, now);
	}

	serialize() {
		return this.articles.map((article) => ({
			id: article.getIdentifier().toString(),
			title: article.props.title,
			slug: article.props.slug,
			isPublished: article.isPublished(this.now),
			publishedAtHuman: article.props.publishedAt?.toFormat('ff') || 'Non publié',
		}));
	}
}
