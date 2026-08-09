import { inject } from '@adonisjs/core';
import { RecordNotFoundException } from '#app/core/exceptions/record_not_found_exception';
import PastePageTransformer from '#app/paste/transformers/paste_page_transformer';
import { PasteRepository } from '#paste/repositories/paste_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowPasteController {
	constructor(private pasteRepository: PasteRepository) {}

	async render({ inertia, params }: HttpContext) {
		const paste = await this.pasteRepository.findById(params.id);

		if (!paste) {
			throw new RecordNotFoundException();
		}

		return inertia.render('pastes/show', {
			vm: PastePageTransformer.transform(paste),
		});
	}
}
