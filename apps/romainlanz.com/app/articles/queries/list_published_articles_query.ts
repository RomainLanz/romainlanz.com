import { inject } from '@adonisjs/core';
import { DateTime } from 'luxon';
import { Article } from '#articles/domain/article';
import { ArticleIdentifier } from '#articles/domain/article_identifier';
import { PublishedArticlesQueryBuilder } from '#articles/queries/published_articles_query_builder';

interface ListPublishedArticlesQueryInput {
	page: number;
	perPage: number;
	categorySlug: string | null;
	tagSlug: string | null;
}

@inject()
export class ListPublishedArticlesQuery {
	constructor(private publishedArticlesQueryBuilder: PublishedArticlesQueryBuilder) {}

	async execute(input: ListPublishedArticlesQueryInput) {
		const articleRecords = await this.publishedArticlesQueryBuilder
			.build(input)
			.select([
				'articles.id',
				'articles.title',
				'articles.summary',
				'articles.slug',
				'articles.published_at',
				'articles.reading_time',
			])
			.orderBy('articles.published_at', 'desc')
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
