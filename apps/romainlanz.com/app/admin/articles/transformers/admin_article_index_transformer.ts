import { BaseTransformer } from '@adonisjs/core/transformers';
import type { Article } from '#articles/domain/article';
import type { DateTime } from 'luxon';

type AdminArticleIndex = {
	articles: Article[];
	now: DateTime;
};

export default class AdminArticleIndexTransformer extends BaseTransformer<AdminArticleIndex> {
	toObject() {
		return this.resource.articles.map((article) => ({
			id: article.getIdentifier().toString(),
			title: article.props.title,
			slug: article.props.slug,
			isPublished: article.isPublished(this.resource.now),
			publishedAtHuman: article.props.publishedAt?.toFormat('ff') || 'Non publié',
		}));
	}
}
