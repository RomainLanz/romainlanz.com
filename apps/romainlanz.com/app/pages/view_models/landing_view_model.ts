import type { Article } from '#articles/domain/article';

export type LandingViewModelSerialized = ReturnType<LandingViewModel['serialize']>;

export class LandingViewModel {
	constructor(private articles: Article[]) {}

	static fromDomain(articles: Article[]) {
		return new this(articles);
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
				readingTime: article.props.readingTime,
			})),
		};
	}
}
