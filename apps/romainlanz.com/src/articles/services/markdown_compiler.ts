import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import {
	transformerMetaHighlight,
	transformerNotationDiff,
	transformerNotationFocus,
	transformerNotationHighlight,
} from '@shikijs/transformers';
import { shikiHighlighter } from '#core/shiki_highlighter';
import { createMarkdownProcessor } from '../../../shared/markdown/processor.js';

export class MarkdownCompiler {
	static #processor = createMarkdownProcessor({
		configureRehype(processor) {
			// @ts-expect-error - Shiki's highlighter type is narrower than rehype's generic plugin contract.
			processor.use(rehypeShikiFromHighlighter, shikiHighlighter, {
				themes: { light: 'rose-pine-dawn', dark: 'rose-pine-dawn' },
				transformers: [
					transformerNotationDiff(),
					transformerNotationHighlight(),
					transformerNotationFocus(),
					transformerMetaHighlight(),
				],
			});
		},
	});

	toHtml(content: string) {
		return MarkdownCompiler.#processor.process(content);
	}
}
