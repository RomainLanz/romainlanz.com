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
}

export class ArticleRepository {
	create(payload: StoreArticleDTO) {
		return db
			.insertInto('articles')
			.values({
				id: ArticleIdentifier.generate().toString(),
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
	}

	update(payload: UpdateArticleDTO) {
		return db
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
	}
}
