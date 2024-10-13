import { MarkdownFile } from '@dimerapp/markdown';
import { Shiki, codeblocks } from '@dimerapp/shiki';
import { toHtml } from '@dimerapp/markdown/utils';
import { tip, note, warning, codegroup } from '@dimerapp/markdown/macros';

export class MarkdownCompiler {
	static #shiki = new Shiki();
	static #booted = false;

	async #boot() {
		if (!MarkdownCompiler.#booted) {
			MarkdownCompiler.#shiki.useTheme('solarized-light');

			await MarkdownCompiler.#shiki.boot();

			MarkdownCompiler.#booted = true;
		}
	}

	#addDirectives(file: MarkdownFile) {
		file.use(tip).use(note).use(warning).use(codegroup);
		file.transform(codeblocks, MarkdownCompiler.#shiki);
	}

	async toHtml(content: string) {
		await this.#boot();

		const file = new MarkdownFile(content, { enableDirectives: true });

		this.#addDirectives(file);

		await file.process();

		return toHtml(file);
	}

	async toAST(content: string) {
		await this.#boot();

		const file = new MarkdownFile(content, { enableDirectives: true, allowHtml: true });

		this.#addDirectives(file);

		await file.process();

		return file.ast;
	}
}
