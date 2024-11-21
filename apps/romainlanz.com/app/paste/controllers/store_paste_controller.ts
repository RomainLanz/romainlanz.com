import { inject } from '@adonisjs/core';
import {
	transformerMetaHighlight,
	transformerNotationDiff,
	transformerNotationFocus,
	transformerNotationHighlight,
} from '@shikijs/transformers';
import vine from '@vinejs/vine';
import { PasteRepository } from '#paste/repositories/paste_repository';
import { codeToHtml, bundledLanguagesInfo } from 'shiki';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class StorePasteController {
	static #validator = vine.compile(
		vine.object({
			lang: vine.string().in(bundledLanguagesInfo.map((lang) => lang.id)),
			content: vine.string(),
		})
	);

	constructor(private pasteRepository: PasteRepository) {}

	render({ inertia }: HttpContext) {
		return inertia.render('pastes/create', {
			bundledLanguages: bundledLanguagesInfo.map((lang) => ({ id: lang.id, name: lang.name })),
		});
	}

	async execute({ request, response }: HttpContext) {
		const payload = await request.validateUsing(StorePasteController.#validator);

		const ghl = await codeToHtml(payload.content, {
			lang: payload.lang,
			themes: {
				light: 'catppuccin-latte', //'rose-pine-dawn',
				dark: 'catppuccin-mocha', //'rose-pine-moon',
			},
			transformers: [
				transformerNotationDiff(),
				transformerNotationHighlight(),
				transformerNotationFocus(),
				transformerMetaHighlight(),
			],
		});

		const paste = await this.pasteRepository.create({
			content: ghl,
			userId: undefined,
		});

		return response.redirect().toRoute('pastes.show', [paste.getIdentifier().toString()], {
			domain: 'paste.romainlanz.localhost',
		});
	}
}
