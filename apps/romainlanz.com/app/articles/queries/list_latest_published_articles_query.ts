import { DateTime } from 'luxon';
import { Article } from '#articles/domain/article';
import { ArticleIdentifier } from '#articles/domain/article_identifier';
import { db } from '#core/services/db';

export class ListLatestPublishedArticlesQuery {
	async execute(limit: number) {
		const articleRecords = await db
			.selectFrom('articles')
			.select(['id', 'title', 'summary', 'slug', 'published_at', 'reading_time'])
			.orderBy('published_at', 'desc')
			.where('published_at', 'is not', null)
			.where('published_at', '<=', new Date())
			.limit(limit)
			.execute();

		return articleRecords.map((article) => {
			return Article.create({
				id: ArticleIdentifier.fromString(article.id),
				publishedAt: DateTime.fromJSDate(article.published_at!),
				title: article.title,
				slug: article.slug,
				summary: article.summary,
				readingTime: article.reading_time,
				content: null,
			});
		});
	}
}
