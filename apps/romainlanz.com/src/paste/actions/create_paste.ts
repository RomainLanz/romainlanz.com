import { inject } from '@adonisjs/core';
import { Paste } from '#paste/domain/paste';
import { PasteIdentifier } from '#paste/domain/paste_identifier';
import { PasteRepository } from '#paste/repositories/paste_repository';
import { HighlightPasteContentService } from '#paste/services/highlight_paste_content_service';

interface CreatePasteInput {
	content: string;
	lang: string;
	userId: string | undefined;
}

@inject()
export class CreatePaste {
	constructor(
		private readonly pasteRepository: PasteRepository,
		private readonly highlightPasteContentService: HighlightPasteContentService,
	) {}

	async execute(input: CreatePasteInput) {
		const content = await this.highlightPasteContentService.execute({
			content: input.content,
			lang: input.lang,
		});
		const paste = Paste.create({
			id: PasteIdentifier.generate(),
			content,
		});

		await this.pasteRepository.create(paste, input.userId);

		return paste;
	}
}
