import rehypeShiki from '@shikijs/rehype';
import { customElementDirective } from '#articles/services/markdown_directives/custom_element';
import { noteDirective } from '#articles/services/markdown_directives/note';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export class MarkdownCompiler {
	static #processor = unified()
		.use(remarkParse)
		.use(remarkDirective)
		.use(customElementDirective)
		.use(noteDirective)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeShiki, {
			themes: {
				light: 'rose-pine-dawn',
				dark: 'rose-pine-moon',
			},
		})
		.use(rehypeStringify);

	toHtml(content: string) {
		return MarkdownCompiler.#processor.process(content);
	}
}
