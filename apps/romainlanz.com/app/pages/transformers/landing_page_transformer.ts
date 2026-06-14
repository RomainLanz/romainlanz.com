import { BaseTransformer } from '@adonisjs/core/transformers';
import type { Article } from '#articles/domain/article';

type LandingPage = {
	articles: Article[];
};

export default class LandingPageTransformer extends BaseTransformer<LandingPage> {
	toObject() {
		return {
			articles: this.resource.articles.map((article) => ({
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
