import { DateTime } from 'luxon';
import { Article } from '#articles/domain/article';
import { ArticleIdentifier } from '#articles/domain/article_identifier';
import { db } from '#core/services/db';

interface ListPublishedArticlesQueryInput {
	page: number;
	perPage: number;
	categorySlug: string | null;
}

export class ListPublishedArticlesQuery {
	async execute(input: ListPublishedArticlesQueryInput) {
		const articleRecords = await db
			.selectFrom('articles')
			.leftJoin('categories', 'articles.category_id', 'categories.id')
			.select([
				'articles.id',
				'articles.title',
				'articles.summary',
				'articles.slug',
				'articles.published_at',
				'articles.reading_time',
			])
			.orderBy('articles.published_at', 'desc')
			.where('articles.published_at', 'is not', null)
			.where('articles.published_at', '<=', new Date())
			.$if(input.categorySlug !== null, (builder) => {
				return builder.where('categories.slug', '=', input.categorySlug!);
			})
			.offset((input.page - 1) * input.perPage)
			.limit(input.perPage)
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
