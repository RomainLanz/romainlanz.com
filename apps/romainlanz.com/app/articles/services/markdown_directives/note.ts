import { directiveMaker } from '#articles/services/markdown_directives/utils';
import { h } from 'hastscript';

export const noteDirective = directiveMaker('note', (node) => {
	const data = node.data || (node.data = {});

	data.hName = 'r-alert-note';
	data.hProperties = h('r-alert-note', node.attributes || { type: 'info' }).properties;
});
