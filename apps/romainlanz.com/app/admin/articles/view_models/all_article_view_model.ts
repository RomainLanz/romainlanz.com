import type { Article } from '#articles/domain/article';

export type AllArticleViewModelSerialized = ReturnType<AllArticleViewModel['serialize']>;

export class AllArticleViewModel {
	constructor(private articles: Article[]) {}

	static fromDomain(articles: Article[]) {
		return new this(articles);
	}

	serialize() {
		return this.articles.map((article) => ({
			id: article.getIdentifier().toString(),
			title: article.props.title,
			slug: article.props.slug,
			isPublished: article.isPublished(),
		}));
	}
}
