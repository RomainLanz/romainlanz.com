import { inject } from '@adonisjs/core';
import { parsePublishedAt } from '#articles/actions/published_at';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { MarkdownCompiler } from '#articles/services/markdown_compiler';

interface UpdateArticleInput {
	id: string;
	title: string;
	summary: string;
	slug: string;
	markdownContent: string;
	publishedAt: string | undefined;
	categoryId: string;
	tagIds: string[];
}

@inject()
export class UpdateArticle {
	constructor(
		private repository: ArticleRepository,
		private markdownCompiler: MarkdownCompiler,
	) {}

	async execute(input: UpdateArticleInput) {
		const markdownHtml = await this.markdownCompiler.toHtml(input.markdownContent);

		return this.repository.update({
			id: input.id,
			title: input.title,
			summary: input.summary,
			slug: input.slug,
			contentHtml: markdownHtml.toString(),
			contentMarkdown: input.markdownContent,
			readingTime: Math.ceil((input.markdownContent.split(' ').length || 0) / 238),
			publishedAt: parsePublishedAt(input.publishedAt),
			categoryId: input.categoryId,
			tagIds: input.tagIds,
		});
	}
}
