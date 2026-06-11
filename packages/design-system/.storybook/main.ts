import TailwindCSS from '@tailwindcss/vite';
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['storybook/actions', '@chromatic-com/storybook'],
	framework: {
		name: '@storybook/vue3-vite',
		options: {},
	},
	viteFinal: (config) => {
		config.plugins ??= [];
		config.plugins.push(TailwindCSS());

		return config;
	},
};

export default config;
