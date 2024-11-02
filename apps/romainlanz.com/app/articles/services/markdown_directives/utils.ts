import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { VFile } from 'vfile';

export function directiveMaker(directiveTag: string, directiveHandler: (node: any, file: VFile) => void) {
	return () => {
		return (tree: Root, file: VFile) => {
			visit(tree, (node) => {
				if (!(node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective')) {
					return;
				}

				if (node.name === directiveTag) {
					return directiveHandler(node, file);
				}
			});
		};
	};
}
