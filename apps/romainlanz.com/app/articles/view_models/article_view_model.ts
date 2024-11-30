import type { Article } from '#articles/domain/article';

export type ArticleViewModelSerialized = ReturnType<ArticleViewModel['serialize']>;

export class ArticleViewModel {
	constructor(private article: Article) {}

	static fromDomain(article: Article) {
		return new this(article);
	}

	serialize() {
		return {
			article: {
				id: this.article.getIdentifier().toString(),
				title: this.article.props.title,
				summary: this.article.props.summary!,
				content: this.article.props.content!,
				slug: this.article.props.slug,
				publishedAtHuman: this.article.props.publishedAt!.toLocaleString({
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				}),
				publishedAt: this.article.props.publishedAt!.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISO()!,
				readingTime: this.article.readingTime,
			},
			category: {
				id: this.article.props.category!.getIdentifier().toString(),
				name: this.article.props.category!.props.name,
				slug: this.article.props.category!.props.slug,
				illustrationName: this.article.props.category!.props.illustrationName!,
			},
		};
	}
}
