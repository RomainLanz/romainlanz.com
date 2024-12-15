import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import {
	transformerMetaHighlight,
	transformerNotationDiff,
	transformerNotationFocus,
	transformerNotationHighlight,
} from '@shikijs/transformers';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { shikiHighlighter } from '#core/shiki_highlighter';

export class MarkdownCompiler {
	static #processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		// @ts-expect-error - No idea, but works (:
		.use(rehypeShikiFromHighlighter, shikiHighlighter, {
			themes: { light: 'rose-pine-dawn', dark: 'rose-pine-dawn' },
			transformers: [
				transformerNotationDiff(),
				transformerNotationHighlight(),
				transformerNotationFocus(),
				transformerMetaHighlight(),
			],
		})
		.use(rehypeRaw)
		.use(rehypeStringify);

	toHtml(content: string) {
		return MarkdownCompiler.#processor.process(content);
	}
}
