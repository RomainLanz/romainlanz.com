import { inject } from '@adonisjs/core';
import { tagColors } from '@rlanz/design-system/tag-color';
import vine from '@vinejs/vine';
import { TaxonomyPolicy } from '#admin/taxonomies/policies/taxonomy_policy';
import { RecordNotFoundException } from '#app/core/exceptions/record_not_found_exception';
import { UpdateTag } from '#taxonomies/actions/update_tag';
import { FindTagByIdQuery } from '#taxonomies/queries/find_tag_by_id_query';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class UpdateTagController {
	static validator = vine.compile(
		vine.object({
			name: vine.string().trim(),
			slug: vine.string().trim(),
			color: vine
				.string()
				.trim()
				.in([...tagColors]),
		}),
	);

	constructor(
		private readonly findTagById: FindTagByIdQuery,
		private readonly updateTag: UpdateTag,
	) {}

	async render({ bouncer, inertia, params }: HttpContext) {
		await bouncer.with(TaxonomyPolicy).authorize('manage');

		const result = await this.findTagById.execute(params.id);

		if (!result.ok) {
			throw new RecordNotFoundException();
		}

		const tag = result.value;

		return inertia.render('admin/taxonomies/tags/update', {
			tag: {
				id: tag.getIdentifier().toString(),
				name: tag.props.name,
				slug: tag.props.slug,
				color: tag.props.color,
			},
		});
	}

	async execute({ bouncer, params, request, response, session }: HttpContext) {
		await bouncer.with(TaxonomyPolicy).authorize('manage');

		const payload = await request.validateUsing(UpdateTagController.validator);

		const result = await this.updateTag.execute({ id: params.id, ...payload });

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
				case 'tag_not_found':
					throw new RecordNotFoundException();
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
