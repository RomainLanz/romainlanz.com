import rehypeShiki from '@shikijs/rehype';
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

export class MarkdownCompiler {
	static #processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeShiki, {
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
		})
		.use(rehypeRaw)
		.use(rehypeStringify);

	toHtml(content: string) {
		return MarkdownCompiler.#processor.process(content);
	}
}
