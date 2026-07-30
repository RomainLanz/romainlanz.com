import { inject } from '@adonisjs/core';
import string from '@adonisjs/core/helpers/string';
import { parsePublishedAt } from '#articles/actions/published_at';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { MarkdownCompiler } from '#articles/services/markdown_compiler';

interface CreateArticleInput {
	title: string;
	summary: string;
	markdownContent: string;
	publishedAt: string | undefined;
	categoryId: string;
	tagIds: string[];
}

@inject()
export class CreateArticle {
	constructor(
		private repository: ArticleRepository,
		private markdownCompiler: MarkdownCompiler,
	) {}

	async execute(input: CreateArticleInput) {
		const markdownHtml = await this.markdownCompiler.toHtml(input.markdownContent);

		return this.repository.create({
			title: input.title,
			summary: input.summary,
			contentHtml: markdownHtml.toString(),
			contentMarkdown: input.markdownContent,
			readingTime: Math.ceil((input.markdownContent.split(' ').length || 0) / 238),
			publishedAt: parsePublishedAt(input.publishedAt),
			slug: string.slug(input.title).toLocaleLowerCase(),
			categoryId: input.categoryId,
			tagIds: input.tagIds,
		});
	}
}
