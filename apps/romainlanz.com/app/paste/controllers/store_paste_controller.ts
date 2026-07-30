import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { bundledLanguagesInfo } from 'shiki';
import { CreatePaste } from '#paste/actions/create_paste';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class StorePasteController {
	static validator = vine.compile(
		vine.object({
			lang: vine.string().in(bundledLanguagesInfo.map((lang) => lang.id)),
			content: vine.string(),
		}),
	);

	constructor(private createPaste: CreatePaste) {}

	render({ inertia }: HttpContext) {
		return inertia.render('pastes/create', {
			bundledLanguages: bundledLanguagesInfo.map((lang) => ({ id: lang.id, name: lang.name })),
		});
	}

	async execute({ request, response }: HttpContext) {
		const payload = await request.validateUsing(StorePasteController.validator);

		const paste = await this.createPaste.execute({
			content: payload.content,
			lang: payload.lang,
			userId: undefined,
		});

		return response.redirect().toPath(`http://paste.romainlanz.localhost/${paste.getIdentifier().toString()}`);
	}
}
