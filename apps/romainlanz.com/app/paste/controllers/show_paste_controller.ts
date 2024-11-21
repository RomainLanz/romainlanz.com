import { inject } from '@adonisjs/core';
import { PasteRepository } from '#paste/repositories/paste_repository';
import { PasteViewModel } from '#paste/view_models/paste_view_model';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowPasteController {
	constructor(private pasteRepository: PasteRepository) {}

	async render({ inertia, params }: HttpContext) {
		const paste = await this.pasteRepository.findById(params.id);

		return inertia.render('pastes/show', {
			vm: PasteViewModel.fromDomain(paste).serialize(),
		});
	}
}
