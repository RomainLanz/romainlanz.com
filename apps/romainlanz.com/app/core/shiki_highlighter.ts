import { normalizeTheme } from 'shiki';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import { bundledLanguages } from 'shiki/langs';
import { rosePine } from '#core/shiki_themes/rose_pine';
import { rosePineDawn } from '#core/shiki_themes/rose_pine_dawn';

export const shikiHighlighter = await createHighlighterCore({
	themes: [normalizeTheme(rosePineDawn), normalizeTheme(rosePine)],
	langs: [
		bundledLanguages.bash(),
		bundledLanguages.html(),
		bundledLanguages.sh(),
		bundledLanguages.javascript(),
		bundledLanguages.typescript(),
		bundledLanguages.vue(),
		bundledLanguages.tsx(),
	],
	engine: createOnigurumaEngine(import('shiki/wasm')),
});
