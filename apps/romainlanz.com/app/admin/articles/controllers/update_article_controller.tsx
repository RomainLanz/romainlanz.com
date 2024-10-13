import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { ArticlePolicy } from '#admin/articles/policies/article_policy';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { MarkdownCompiler } from '#articles/services/markdown_compiler';
import { CategoryRepository } from '#categories/repositories/category_repository';
import { AdminArticleView } from '#views/pages/admin/articles/main';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class UpdateArticleController {
	static validator = vine.compile(
		vine.object({
			title: vine.string().minLength(3).maxLength(100),
			canonicalUrl: vine.string().normalizeUrl(),
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

	async render({ bouncer, params }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('update');

		const [article, categories] = await Promise.all([
			this.repository.findById(params.id),
			this.categoryRepository.all(),
		]);

		return <AdminArticleView.Update article={article} categories={categories} />;
	}

	async execute({ bouncer, request, response }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('update');

		const { title, markdownContent, canonicalUrl, categoryId } = await request.validateUsing(
			UpdateArticleController.validator
		);

		const markdownAst = await this.markdownCompiler.toAST(markdownContent);

		await this.repository.update({
			id: request.param('id')!,
			description: '',
			title,
			markdownContent,
			canonicalUrl,
			markdownAst,
			categoryId,
		});

		return response.redirect().toRoute('admin.articles.index');
	}
}
