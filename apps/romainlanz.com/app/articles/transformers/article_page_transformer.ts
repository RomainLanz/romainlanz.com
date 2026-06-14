import { BaseTransformer } from '@adonisjs/core/transformers';
import type { Article } from '#articles/domain/article';

export default class ArticlePageTransformer extends BaseTransformer<Article> {
	toObject() {
		return {
			article: {
				id: this.resource.getIdentifier().toString(),
				title: this.resource.props.title,
				summary: this.resource.props.summary!,
				content: this.resource.props.content!,
				slug: this.resource.props.slug,
				publishedAtHuman: this.resource.props.publishedAt!.toLocaleString({
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				}),
				publishedAt: this.resource.props.publishedAt!.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISO()!,
				readingTime: this.resource.props.readingTime,
			},
			category: {
				id: this.resource.props.category!.getIdentifier().toString(),
				name: this.resource.props.category!.props.name,
				slug: this.resource.props.category!.props.slug,
				illustrationName: this.resource.props.category!.props.illustrationName!,
			},
		};
	}
}
