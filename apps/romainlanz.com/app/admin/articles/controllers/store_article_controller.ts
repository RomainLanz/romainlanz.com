import { inject } from '@adonisjs/core';
import string from '@adonisjs/core/helpers/string';
import vine from '@vinejs/vine';
import { ArticlePolicy } from '#admin/articles/policies/article_policy';
import { parsePublishedAt } from '#admin/articles/published_at';
import { tagIdsValidator } from '#admin/articles/tag_ids_validator';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { MarkdownCompiler } from '#articles/services/markdown_compiler';
import { ListCategoriesQuery } from '#taxonomies/queries/list_categories_query';
import { ListTagsQuery } from '#taxonomies/queries/list_tags_query';
import CategoryOptionTransformer from '#taxonomies/transformers/category_option_transformer';
import TagOptionTransformer from '#taxonomies/transformers/tag_option_transformer';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class StoreArticleController {
	static validator = vine.compile(
		vine.object({
			title: vine.string().minLength(3).maxLength(100),
			summary: vine.string().minLength(3).maxLength(255),
			markdownContent: vine.string().minLength(3),
			publishedAt: vine.string().optional(),
			// TODO: Validate that the category exists
			categoryId: vine.string().uuid(),
			tagIds: tagIdsValidator,
		}),
	);

	constructor(
		private repository: ArticleRepository,
		private listCategories: ListCategoriesQuery,
		private listTags: ListTagsQuery,
		private markdownCompiler: MarkdownCompiler,
	) {}

	async render({ bouncer, inertia }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('create');

		const [categories, tags] = await Promise.all([this.listCategories.execute(), this.listTags.execute()]);

		return inertia.render('admin/articles/create', {
			categories: CategoryOptionTransformer.transform(categories),
			tags: TagOptionTransformer.transform(tags),
		});
	}

	async execute({ bouncer, request, response }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('create');

		const {
			title,
			summary,
			markdownContent,
			publishedAt,
			categoryId,
			tagIds = [],
		} = await request.validateUsing(StoreArticleController.validator);

		// const slug = string.slug(title).toLocaleLowerCase();
		const markdownHtml = await this.markdownCompiler.toHtml(markdownContent);

		await this.repository.create({
			title,
			summary,
			contentHtml: markdownHtml.toString(),
			contentMarkdown: markdownContent,
			readingTime: Math.ceil((markdownContent.split(' ').length || 0) / 238),
			publishedAt: parsePublishedAt(publishedAt),
			slug: string.slug(title).toLocaleLowerCase(),
			categoryId,
			tagIds,
		});

		return response.redirect().toRoute('admin.articles.index');
	}
}
