import { preview } from '../../../.storybook/preview';
import Button from './button.vue';

const argTypes = {
	color: {
		options: ['cyan', 'violet', 'red', 'yellow', 'lime'],
	},
	size: {
		options: ['small', 'medium'],
	},
	flat: {
		control: 'boolean',
	},
	default: {
		type: 'string',
	},
} as const;

const args = {
	default: 'Click me',
};

const meta = preview.meta({
	component: Button,
	title: 'Atoms/Button',
});

export default meta;

export const Base = meta.story({
	argTypes,
	args,
});

export const Flat = meta.story({
	argTypes,
	args: {
		...args,
		flat: true,
	},
});

export const Link = meta.story({
	argTypes,
	args: {
		...args,
		href: 'https://romainlanz.com',
	},
});
