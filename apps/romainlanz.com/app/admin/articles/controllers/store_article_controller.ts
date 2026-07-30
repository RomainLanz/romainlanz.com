import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { ArticlePolicy } from '#admin/articles/policies/article_policy';
import { tagIdsValidator } from '#admin/articles/tag_ids_validator';
import CategoryOptionTransformer from '#app/taxonomies/transformers/category_option_transformer';
import TagOptionTransformer from '#app/taxonomies/transformers/tag_option_transformer';
import { CreateArticle } from '#articles/actions/create_article';
import { ListCategoriesQuery } from '#taxonomies/queries/list_categories_query';
import { ListTagsQuery } from '#taxonomies/queries/list_tags_query';
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
		private createArticle: CreateArticle,
		private listCategories: ListCategoriesQuery,
		private listTags: ListTagsQuery,
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

		await this.createArticle.execute({
			title,
			summary,
			markdownContent,
			publishedAt,
			categoryId,
			tagIds,
		});

		return response.redirect().toRoute('admin.articles.index');
	}
}
