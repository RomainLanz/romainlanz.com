import app from '@adonisjs/core/services/app';
import { CreatePaste } from '#paste/actions/create_paste';
import { PasteRepository } from '#paste/repositories/paste_repository';
import { HighlightPasteContentService } from '#paste/services/highlight_paste_content_service';
import type { Paste } from '#paste/domain/paste';

export class FakePasteRepository {
	createdPaste?: Paste;
	userId?: string;

	async create(paste: Paste, userId: string | undefined) {
		this.createdPaste = paste;
		this.userId = userId;
	}
}

export class FakeHighlightPasteContentService {
	input?: { content: string; lang: string };

	async execute(input: { content: string; lang: string }) {
		this.input = input;

		return '<pre>Highlighted paste</pre>';
	}
}

export class PasteActionsFixture {
	readonly pasteRepository = new FakePasteRepository();
	readonly highlightPasteContentService = new FakeHighlightPasteContentService();

	setup() {
		app.container.swap(PasteRepository, () => this.pasteRepository as unknown as PasteRepository);
		app.container.swap(
			HighlightPasteContentService,
			() => this.highlightPasteContentService as unknown as HighlightPasteContentService,
		);
	}

	cleanup() {
		app.container.restore(PasteRepository);
		app.container.restore(HighlightPasteContentService);
	}

	async createPaste(input: { content: string; lang: string; userId: string | undefined }) {
		const action = await app.container.make(CreatePaste);

		return action.execute(input);
	}
}
