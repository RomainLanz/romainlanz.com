import { visit } from 'unist-util-visit';
import type { Code, Root, RootContent } from 'mdast';
import type { Plugin } from 'unified';

const alertNoteTypes = ['info', 'success', 'warning', 'danger'] as const;
const codegroupTabPattern = /(?:^|\s)tab=(?:"([^"]+)"|'([^']+)'|([^\s]+))/;

type AlertNoteType = (typeof alertNoteTypes)[number];

type HastData = {
	hName?: string;
	hProperties?: Record<string, string>;
};

type CodegroupTab = {
	type: 'codegroupTab';
	data?: HastData;
	children: [Code];
};

type DirectiveAttributes = Record<string, string | null | undefined>;

type MarkdownContainerDirective = {
	type: 'containerDirective';
	name: string;
	attributes?: DirectiveAttributes;
	data?: HastData;
	children: Array<RootContent | CodegroupTab>;
};

function isAlertNoteType(value: unknown): value is AlertNoteType {
	return typeof value === 'string' && alertNoteTypes.includes(value as AlertNoteType);
}

function isContainerDirective(node: unknown): node is MarkdownContainerDirective {
	return isNodeWithType(node, 'containerDirective');
}

function isCodeNode(node: unknown): node is Code {
	return isNodeWithType(node, 'code');
}

function isNodeWithType(node: unknown, type: string): node is { type: string } {
	return typeof node === 'object' && node !== null && 'type' in node && node.type === type;
}

export const markdownDirectives: Plugin<[], Root> = () => {
	return (tree: Root) => {
		visit(tree, (node) => {
			if (!isContainerDirective(node)) {
				return;
			}

			compileDirective(node);
		});
	};
};

function compileDirective(node: MarkdownContainerDirective) {
	if (node.name === 'alert-note') {
		compileAlertNoteDirective(node);
		return;
	}

	if (node.name === 'codegroup') {
		compileCodegroupDirective(node);
		return;
	}

	throw new Error(`Unsupported markdown directive "${node.name}"`);
}

function compileAlertNoteDirective(node: MarkdownContainerDirective) {
	const type = node.attributes?.type ?? 'info';

	if (!isAlertNoteType(type)) {
		throw new Error(`Unsupported alert note type "${type}"`);
	}

	node.data = {
		...node.data,
		hName: 'r-alert-note',
		hProperties: {
			type,
		},
	};
}

function compileCodegroupDirective(node: MarkdownContainerDirective) {
	const codeBlocks = node.children.map((child) => {
		if (!isCodeNode(child)) {
			throw new Error('Codegroup directives only support code blocks');
		}

		return child;
	});

	const tabs = codeBlocks.map((codeBlock) => {
		const tab = extractCodegroupTab(codeBlock);

		codeBlock.meta = removeCodegroupTab(codeBlock.meta ?? undefined);

		return tab;
	});

	if (tabs.length === 0) {
		throw new Error('Codegroup directives must contain at least one code block');
	}

	node.data = {
		...node.data,
		hName: 'r-codeblock',
		hProperties: {
			tabs: tabs.join(','),
		},
	};

	node.children = codeBlocks.map((codeBlock, index): CodegroupTab => {
		return {
			type: 'codegroupTab',
			data: {
				hName: 'div',
				hProperties: {
					slot: tabs[index],
				},
			},
			children: [codeBlock],
		};
	});
}

function extractCodegroupTab(node: Code) {
	const match = codegroupTabPattern.exec(node.meta ?? '');
	const tab = match?.[1] ?? match?.[2] ?? match?.[3];

	if (!tab) {
		throw new Error('Codegroup code blocks must define a tab attribute');
	}

	return tab;
}

function removeCodegroupTab(meta?: string) {
	return meta?.replace(codegroupTabPattern, '').trim() || undefined;
}
