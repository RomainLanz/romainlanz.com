import { inject } from '@adonisjs/core';
import { tagColors } from '@rlanz/design-system/tag-color';
import vine from '@vinejs/vine';
import { TaxonomyPolicy } from '#admin/taxonomies/policies/taxonomy_policy';
import { CreateTag } from '#taxonomies/actions/create_tag';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class StoreTagController {
	static validator = vine.compile(
		vine.object({
			name: vine.string().trim().minLength(1),
			slug: vine.string().trim().optional(),
			color: vine
				.string()
				.trim()
				.in([...tagColors]),
		}),
	);

	constructor(private readonly createTag: CreateTag) {}

	async render({ bouncer, inertia }: HttpContext) {
		await bouncer.with(TaxonomyPolicy).authorize('manage');

		return inertia.render('admin/taxonomies/tags/create', {});
	}

	async execute({ bouncer, request, response, session }: HttpContext) {
		await bouncer.with(TaxonomyPolicy).authorize('manage');

		const payload = await request.validateUsing(StoreTagController.validator);
		const result = await this.createTag.execute(payload);

		if (!result.ok) {
			switch (result.error.type) {
				case 'tag_name_already_exists':
					session.flash('inputErrorsBag', {
						name: ['Ce nom est déjà utilisé.'],
					});
					break;
				case 'tag_slug_already_exists':
					session.flash('inputErrorsBag', {
						slug: ['Ce slug est déjà utilisé.'],
					});
					break;
				default: {
					const exhaustive: never = result.error;
					return exhaustive;
				}
			}

			return response.redirect().back();
		}

		return response.redirect().toRoute('admin.taxonomies.index');
	}
}
