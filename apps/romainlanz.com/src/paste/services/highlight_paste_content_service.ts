import {
	transformerMetaHighlight,
	transformerNotationDiff,
	transformerNotationFocus,
	transformerNotationHighlight,
} from '@shikijs/transformers';
import { codeToHtml } from 'shiki';

interface HighlightPasteContentInput {
	content: string;
	lang: string;
}

export class HighlightPasteContentService {
	execute(input: HighlightPasteContentInput) {
		return codeToHtml(input.content, {
			lang: input.lang,
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
	}
}
