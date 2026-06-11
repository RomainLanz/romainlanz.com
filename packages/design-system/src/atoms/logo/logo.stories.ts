import { preview } from '../../../.storybook/preview';
import Logo from './logo.vue';

const argTypes = {
	monochrome: {
		type: 'boolean',
	},
} as const;

const meta = preview.meta({
	component: Logo,
	title: 'Atoms/Logo',
});

export default meta;

export const Colorful = meta.story({
	argTypes,
	args: {
		monochrome: false,
	},
});

export const Monochrome = meta.story({
	argTypes,
	args: {
		monochrome: true,
	},
});
