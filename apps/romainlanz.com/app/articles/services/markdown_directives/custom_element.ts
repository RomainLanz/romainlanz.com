import { directiveMaker } from '#articles/services/markdown_directives/utils';
import { h } from 'hastscript';

export const customElementDirective = directiveMaker('ce', (node, file) => {
	const data = node.data || (node.data = {});

	const tag = node.attributes.tag as string;

	if (!tag) {
		file.fail('Unexpected missing `tag` on `ce` directive', node);
	}

	data.hName = tag;
	data.hProperties = h(tag, node.attributes || {}).properties;
});
