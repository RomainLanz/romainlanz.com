import type { Article } from '#articles/domain/article';
import type { Category } from '#categories/domain/category';

export type ArticleListViewModelSerialized = ReturnType<ArticleListViewModel['serialize']>;

export class ArticleListViewModel {
	constructor(
		private articles: Article[],
		private categories: Category[]
	) {}

	static fromDomain(articles: Article[], categories: Category[]) {
		return new this(articles, categories);
	}

	serialize() {
		return {
			articles: this.articles.map((article) => ({
				id: article.getIdentifier().toString(),
				title: article.props.title,
				summary: article.props.summary!,
				slug: article.props.slug,
				publishedAtHuman: article.props.publishedAt!.toFormat('DD'),
				publishedAt: article.props.publishedAt!.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISO(),
			})),
			categories: this.categories.map((category) => ({
				id: category.getIdentifier().toString(),
				name: category.props.name,
				slug: category.props.slug,
				illustrationName: category.props.illustrationName,
				articleCount: category.props.articleCount || 0,
			})),
		};
	}
}