import { inject } from '@adonisjs/core';
import { tagColors } from '@rlanz/design-system/tag-color';
import vine from '@vinejs/vine';
import {
	TagNameAlreadyExistsError,
	TagRepository,
	TagSlugAlreadyExistsError,
} from '#taxonomies/repositories/tag_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class StoreTagController {
	static validator = vine.compile(
		vine.object({
			name: vine.string().trim(),
			slug: vine.string().trim().optional(),
			color: vine
				.string()
				.trim()
				.in([...tagColors]),
		}),
	);

	constructor(private readonly repository: TagRepository) {}

	render({ inertia }: HttpContext) {
		return inertia.render('admin/taxonomies/tags/create', {});
	}

	async execute({ request, response, session }: HttpContext) {
		const payload = await request.validateUsing(StoreTagController.validator);

		try {
			await this.repository.create(payload);
		} catch (error) {
			if (error instanceof TagNameAlreadyExistsError) {
				session.flash('inputErrorsBag', {
					name: ['Ce nom est déjà utilisé.'],
				});
			} else if (error instanceof TagSlugAlreadyExistsError) {
				session.flash('inputErrorsBag', {
					slug: ['Ce slug est déjà utilisé.'],
				});
			} else {
				throw error;
			}

			return response.redirect().back();
		}

		return response.redirect().toRoute('admin.taxonomies.index');
	}
}
