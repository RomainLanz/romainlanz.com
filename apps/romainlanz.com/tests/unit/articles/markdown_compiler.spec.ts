import { test } from '@japa/runner';
import { MarkdownCompiler } from '#articles/services/markdown_compiler';

test.group('Markdown compiler', () => {
	test('compiles alert note directives with markdown content', async ({ assert }) => {
		const html = String(
			await new MarkdownCompiler().toHtml(`
:::alert-note{type="warning"}
Use \`node ace test\` before shipping.

This also supports **strong text**.
:::
`),
		);

		assert.include(html, '<r-alert-note type="warning">');
		assert.include(html, '<p>Use <code>node ace test</code> before shipping.</p>');
		assert.include(html, '<p>This also supports <strong>strong text</strong>.</p>');
	});

	test('uses info alert notes by default', async ({ assert }) => {
		const html = String(
			await new MarkdownCompiler().toHtml(`
:::alert-note
Default note.
:::
`),
		);

		assert.include(html, '<r-alert-note type="info">');
	});

	test('rejects unsupported alert note types', async ({ assert }) => {
		await assert.rejects(async () => {
			await new MarkdownCompiler().toHtml(`
:::alert-note{type="loud"}
Nope.
:::
`);
		}, /Unsupported alert note type "loud"/);
	});

	test('rejects unsupported markdown directives', async ({ assert }) => {
		await assert.rejects(async () => {
			await new MarkdownCompiler().toHtml(`
:::callout
Nope.
:::
`);
		}, /Unsupported markdown directive "callout"/);
	});

	test('compiles codegroup directives to codeblock custom elements', async ({ assert }) => {
		const html = String(
			await new MarkdownCompiler().toHtml(`
:::codegroup
\`\`\`ts tab=app.ts
const app = 'site';
\`\`\`

\`\`\`ts tab=test.ts
const test = 'markdown';
\`\`\`
:::
`),
		);

		assert.include(html, '<r-codeblock tabs="app.ts,test.ts">');
		assert.include(html, 'slot="app.ts"');
		assert.include(html, 'site');
		assert.include(html, 'slot="test.ts"');
		assert.include(html, 'markdown');
	});

	test('rejects codegroup directives without tab attributes', async ({ assert }) => {
		await assert.rejects(async () => {
			await new MarkdownCompiler().toHtml(`
:::codegroup
\`\`\`ts
const app = 'site';
\`\`\`
:::
`);
		}, /Codegroup code blocks must define a tab attribute/);
	});
});
