import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { ArticlePolicy } from '#admin/articles/policies/article_policy';
import { GetArticleForUpdateQuery } from '#admin/articles/queries/get_article_for_update_query';
import { tagIdsValidator } from '#admin/articles/tag_ids_validator';
import { RecordNotFoundException } from '#app/core/exceptions/record_not_found_exception';
import CategoryOptionTransformer from '#app/taxonomies/transformers/category_option_transformer';
import TagOptionTransformer from '#app/taxonomies/transformers/tag_option_transformer';
import { UpdateArticle } from '#articles/actions/update_article';
import { ListCategoriesQuery } from '#taxonomies/queries/list_categories_query';
import { ListTagsQuery } from '#taxonomies/queries/list_tags_query';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class UpdateArticleController {
	static validator = vine.compile(
		vine.object({
			title: vine.string().minLength(3).maxLength(100),
			summary: vine.string().minLength(3).maxLength(255),
			markdownContent: vine.string().minLength(3),
			slug: vine.string().minLength(3),
			publishedAt: vine.string().optional(),
			// TODO: Validate that the category exists
			categoryId: vine.string().uuid(),
			tagIds: tagIdsValidator,
		}),
	);

	constructor(
		private updateArticle: UpdateArticle,
		private getArticleForUpdate: GetArticleForUpdateQuery,
		private listCategories: ListCategoriesQuery,
		private listTags: ListTagsQuery,
	) {}

	async render({ bouncer, params, inertia }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('update');

		const [article, categories, tags] = await Promise.all([
			this.getArticleForUpdate.execute(params.id),
			this.listCategories.execute(),
			this.listTags.execute(),
		]);

		return inertia.render('admin/articles/update', {
			article,
			categories: CategoryOptionTransformer.transform(categories),
			tags: TagOptionTransformer.transform(tags),
		});
	}

	async execute({ bouncer, request, response }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('update');

		const {
			title,
			summary,
			slug,
			markdownContent,
			publishedAt,
			categoryId,
			tagIds = [],
		} = await request.validateUsing(UpdateArticleController.validator);

		const result = await this.updateArticle.execute({
			id: request.param('id')!,
			title,
			summary,
			slug,
			markdownContent,
			publishedAt,
			categoryId,
			tagIds,
		});

		if (!result.ok) {
			const errorType = result.error.type;

			switch (errorType) {
				case 'article_not_found':
					throw new RecordNotFoundException();
				default: {
					const exhaustive: never = errorType;
					return exhaustive;
				}
			}
		}

		return response.redirect().toRoute('admin.articles.index');
	}
}
