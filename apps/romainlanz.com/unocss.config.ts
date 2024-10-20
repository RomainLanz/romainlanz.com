import { colors } from '@rlanz/design-system/tokens';
import defineConfig from '@rlanz/tooling/unocss';

export default defineConfig({
	theme: {
		colors,
	},
	content: {
		filesystem: ['./inertia/**/*.vue', './node_modules/@rlanz/design-system/**/*.vue'],
	},
});
