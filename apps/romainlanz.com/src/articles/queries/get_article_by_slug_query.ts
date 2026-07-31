import { DateTime } from 'luxon';
import { RecordNotFoundException } from '#app/core/exceptions/record_not_found_exception';
import { Article } from '#articles/domain/article';
import { ArticleIdentifier } from '#articles/domain/article_identifier';
import { db } from '#core/services/db';
import { Category } from '#taxonomies/domain/category';
import { CategoryIdentifier } from '#taxonomies/domain/category_identifier';
import { Tag } from '#taxonomies/domain/tag';
import { parseTagColor } from '#taxonomies/domain/tag_color';
import { TagIdentifier } from '#taxonomies/domain/tag_identifier';
import type { IllustrationName } from '@rlanz/design-system/illustration-name';

export class GetArticleBySlugQuery {
	async execute(slug: string) {
		const articleRecord = await db
			.selectFrom('articles')
			.leftJoin('categories', 'articles.category_id', 'categories.id')
			.select([
				'articles.id',
				'articles.title',
				'articles.slug',
				'articles.summary',
				'articles.content_html',
				'articles.published_at',
				'articles.reading_time',
				'categories.id as category_id',
				'categories.name as category_name',
				'categories.slug as category_slug',
				'categories.illustration_name as category_illustration_name',
			])
			.where('articles.slug', '=', slug)
			.executeTakeFirst();

		if (!articleRecord) {
			throw new RecordNotFoundException();
		}

		const tagRecords = await db
			.selectFrom('tag_articles')
			.innerJoin('tags', 'tag_articles.tag_id', 'tags.id')
			.select(['tags.id', 'tags.name', 'tags.slug', 'tags.color'])
			.where('tag_articles.article_id', '=', articleRecord.id)
			.orderBy('tags.name')
			.execute();

		return Article.create({
			id: ArticleIdentifier.fromString(articleRecord.id),
			title: articleRecord.title,
			slug: articleRecord.slug,
			content: articleRecord.content_html,
			summary: articleRecord.summary,
			publishedAt: DateTime.fromJSDate(articleRecord.published_at!),
			readingTime: articleRecord.reading_time,
			category: Category.create({
				id: CategoryIdentifier.fromString(articleRecord.category_id!),
				name: articleRecord.category_name!,
				slug: articleRecord.category_slug!,
				illustrationName: articleRecord.category_illustration_name as IllustrationName,
			}),
			tags: tagRecords.map((tag) =>
				Tag.create({
					id: TagIdentifier.fromString(tag.id),
					name: tag.name,
					slug: tag.slug,
					color: parseTagColor(tag.color),
				}),
			),
		});
	}
}
