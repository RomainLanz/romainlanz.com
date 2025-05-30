import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { ArticlePolicy } from '#admin/articles/policies/article_policy';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { MarkdownCompiler } from '#articles/services/markdown_compiler';
import { CategoryRepository } from '#taxonomies/repositories/category_repository';
import { AllCategoryViewModel } from '#taxonomies/view_models/all_category_view_model';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class UpdateArticleController {
	static validator = vine.compile(
		vine.object({
			title: vine.string().minLength(3).maxLength(100),
			summary: vine.string().minLength(3).maxLength(255),
			markdownContent: vine.string().minLength(3),
			slug: vine.string().minLength(3),
			// TODO: Validate that the category exists
			categoryId: vine.string().uuid(),
		})
	);

	constructor(
		private repository: ArticleRepository,
		private categoryRepository: CategoryRepository,
		private markdownCompiler: MarkdownCompiler
	) {}

	async render({ bouncer, params, inertia }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('update');

		const [article, categories] = await Promise.all([
			this.repository.findById(params.id),
			this.categoryRepository.all(),
		]);

		return inertia.render('admin/articles/update', {
			article,
			categories: AllCategoryViewModel.fromDomain(categories).serialize(),
		});
	}

	async execute({ bouncer, request, response }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('update');

		const { title, summary, slug, markdownContent, categoryId } = await request.validateUsing(
			UpdateArticleController.validator
		);

		const markdownHtml = await this.markdownCompiler.toHtml(markdownContent);

		await this.repository.update({
			id: request.param('id')!,
			title,
			summary,
			slug,
			contentHtml: markdownHtml.toString(),
			contentMarkdown: markdownContent,
			readingTime: Math.ceil((markdownContent.split(' ').length || 0) / 238),
			categoryId,
		});

		return response.redirect().toRoute('admin.articles.index');
	}
}
