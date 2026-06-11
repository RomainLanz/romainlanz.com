import { DateTime } from 'luxon';
import { Article } from '#articles/domain/article';
import { ArticleIdentifier } from '#articles/domain/article_identifier';
import { db } from '#core/services/db';

export class ListAdminArticlesQuery {
	async execute() {
		const articleRecords = await db
			.selectFrom('articles')
			.select(['id', 'title', 'slug', 'published_at', 'reading_time'])
			.orderBy('published_at desc')
			.execute();

		return articleRecords.map((article) => {
			return Article.create({
				id: ArticleIdentifier.fromString(article.id),
				publishedAt: article.published_at ? DateTime.fromJSDate(article.published_at) : null,
				title: article.title,
				slug: article.slug,
				readingTime: article.reading_time,
				summary: null,
				content: null,
			});
		});
	}
}
