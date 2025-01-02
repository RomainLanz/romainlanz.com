import { colors } from '@rlanz/design-system/tokens';
import { defineConfig, presetUno, presetIcons, presetWebFonts, transformerDirectives } from 'unocss';

export default defineConfig({
	theme: {
		colors,
		boxShadow: {
			tiny: '2px 2px 0 #1e293b',
			small: '4px 4px 0 #1e293b',
			medium: '8px 8px 0 #1e293b',
			large: '12px 12px 0 #1e293b',
		},

		borderRadius: {
			ms: '0.25rem',
		},

		breakpoints: {
			'xs': '375px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
	},

	presets: [
		presetUno(),
		presetWebFonts({
			provider: 'bunny',

			fonts: {
				sans: ['Atkinson Hyperlegible'],
				mono: [
					{
						name: 'mononoki',
						provider: 'none',
					},
				],
			},
		}),
		presetIcons({
			cdn: 'https://esm.sh/',
		}),
	],

	content: {
		filesystem: ['./apps/romainlanz.com/inertia/**/*.vue', './packages/design-system/**/*.vue'],
	},

	transformers: [transformerDirectives()],
});
