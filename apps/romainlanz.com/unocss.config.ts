import { tokens } from '@rlanz/design-system';
import defineConfig from '@rlanz/tooling/unocss';

export default defineConfig({
	theme: {
		colors: tokens,
	},
	content: {
		filesystem: ['./inertia/**/*.vue', './node_modules/@rlanz/design-system/**/*.vue'],
	},
});
