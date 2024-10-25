import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { ArticlePolicy } from '#admin/articles/policies/article_policy';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { MarkdownCompiler } from '#articles/services/markdown_compiler';
import { CategoryRepository } from '#categories/repositories/category_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class StoreArticleController {
	static validator = vine.compile(
		vine.object({
			title: vine.string().minLength(3).maxLength(100),
			description: vine.string().minLength(3).maxLength(255),
			canonicalUrl: vine.string().normalizeUrl().optional(),
			markdownContent: vine.string().minLength(3),
			// TODO: Validate that the category exists
			categoryId: vine.string().uuid(),
		})
	);

	constructor(
		private repository: ArticleRepository,
		private categoryRepository: CategoryRepository,
		private markdownCompiler: MarkdownCompiler
	) {}

	async render({ bouncer, inertia }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('create');

		const categories = await this.categoryRepository.all();

		return inertia.render('admin/articles/create', {
			categories,
		});
	}

	async execute({ bouncer, request, response }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('create');

		const { title, description, markdownContent, canonicalUrl, categoryId } = await request.validateUsing(
			StoreArticleController.validator
		);

		// const slug = string.slug(title).toLocaleLowerCase();
		const markdownAst = await this.markdownCompiler.toAST(markdownContent);

		await this.repository.create({
			canonicalUrl: canonicalUrl || slug,
			title,
			description,
			markdownContent,
			markdownAst,
			slug,
			categoryId,
		});

		return response.redirect().toRoute('admin.articles.index');
	}
}
