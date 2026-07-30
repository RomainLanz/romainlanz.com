import { ArticleIdentifier } from '#articles/domain/article_identifier';
import { db } from '#core/services/db';

interface StoreArticleDTO {
	title: string;
	summary: string;
	slug: string;
	contentHtml: string;
	contentMarkdown: string;
	readingTime: number;
	publishedAt: Date | null;
	categoryId: string;
	tagIds: string[];
}

interface UpdateArticleDTO {
	id: string;
	summary: string;
	title: string;
	slug: string;
	contentHtml: string;
	contentMarkdown: string;
	readingTime: number;
	publishedAt: Date | null;
	categoryId: string;
	tagIds: string[];
}

export class ArticleRepository {
	create(payload: StoreArticleDTO) {
		return db.transaction().execute(async (trx) => {
			const articleId = ArticleIdentifier.generate().toString();

			await trx
				.insertInto('articles')
				.values({
					id: articleId,
					created_at: new Date(),
					title: payload.title,
					slug: payload.slug,
					summary: payload.summary,
					content_html: payload.contentHtml,
					content_markdown: payload.contentMarkdown,
					reading_time: payload.readingTime,
					published_at: payload.publishedAt,
					category_id: payload.categoryId,
				})
				.execute();

			if (payload.tagIds.length > 0) {
				await trx
					.insertInto('tag_articles')
					.values(payload.tagIds.map((tagId) => ({ article_id: articleId, tag_id: tagId })))
					.execute();
			}
		});
	}

	update(payload: UpdateArticleDTO) {
		return db.transaction().execute(async (trx) => {
			await trx
				.updateTable('articles')
				.set({
					title: payload.title,
					summary: payload.summary,
					slug: payload.slug,
					content_html: payload.contentHtml,
					content_markdown: payload.contentMarkdown,
					reading_time: payload.readingTime,
					published_at: payload.publishedAt,
					category_id: payload.categoryId,
				})
				.where('id', '=', payload.id)
				.execute();

			await trx.deleteFrom('tag_articles').where('article_id', '=', payload.id).execute();

			if (payload.tagIds.length > 0) {
				await trx
					.insertInto('tag_articles')
					.values(payload.tagIds.map((tagId) => ({ article_id: payload.id, tag_id: tagId })))
					.execute();
			}
		});
	}
}
