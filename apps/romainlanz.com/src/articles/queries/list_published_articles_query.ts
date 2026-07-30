import { inject } from '@adonisjs/core';
import { DateTime } from 'luxon';
import { Article } from '#articles/domain/article';
import { ArticleIdentifier } from '#articles/domain/article_identifier';
import { PublishedArticlesQueryBuilder } from '#articles/queries/published_articles_query_builder';
import { db } from '#core/services/db';
import { Tag } from '#taxonomies/domain/tag';
import { parseTagColor } from '#taxonomies/domain/tag_color';
import { TagIdentifier } from '#taxonomies/domain/tag_identifier';

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

		const articleIds = articleRecords.map((article) => article.id);
		const tagRecords =
			articleIds.length > 0
				? await db
						.selectFrom('tag_articles')
						.innerJoin('tags', 'tag_articles.tag_id', 'tags.id')
						.select(['tag_articles.article_id', 'tags.id', 'tags.name', 'tags.slug', 'tags.color'])
						.where('tag_articles.article_id', 'in', articleIds)
						.orderBy('tags.name')
						.execute()
				: [];

		const tagsByArticleId = new Map<string, Tag[]>();
		for (const tagRecord of tagRecords) {
			const tags = tagsByArticleId.get(tagRecord.article_id) ?? [];

			tags.push(
				Tag.create({
					id: TagIdentifier.fromString(tagRecord.id),
					name: tagRecord.name,
					slug: tagRecord.slug,
					color: parseTagColor(tagRecord.color),
				}),
			);

			tagsByArticleId.set(tagRecord.article_id, tags);
		}

		return articleRecords.map((article) => {
			return Article.create({
				id: ArticleIdentifier.fromString(article.id),
				publishedAt: DateTime.fromJSDate(article.published_at!),
				title: article.title,
				slug: article.slug,
				summary: article.summary,
				readingTime: article.reading_time,
				content: null,
				tags: tagsByArticleId.get(article.id) ?? [],
			});
		});
	}
}
