import Button from './button.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Button,
	title: 'Atoms/Button',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	argTypes: {
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
	},
	args: {
		default: 'Click me',
	},
};

export const Flat: Story = {
	argTypes: Base.argTypes,
	args: {
		...Base.args,
		flat: true,
	},
};

export const Link: Story = {
	argTypes: Base.argTypes,
	args: {
		...Base.args,
		href: 'https://romainlanz.com',
	},
};
