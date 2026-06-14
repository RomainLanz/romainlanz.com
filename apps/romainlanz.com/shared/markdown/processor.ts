import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { markdownDirectives } from './directives.js';

function createMarkdownRehypeProcessor() {
	return unified()
		.use(remarkParse)
		.use(remarkDirective)
		.use(remarkGfm)
		.use(markdownDirectives)
		.use(remarkRehype, { allowDangerousHtml: true });
}

type MarkdownProcessorOptions = {
	configureRehype?: (processor: ReturnType<typeof createMarkdownRehypeProcessor>) => void;
};

export function createMarkdownProcessor(options: MarkdownProcessorOptions = {}) {
	const processor = createMarkdownRehypeProcessor();

	options.configureRehype?.(processor);

	return processor.use(rehypeRaw).use(rehypeStringify);
}
