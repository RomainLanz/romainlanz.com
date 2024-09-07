import type { Meta, StoryObj } from '@storybook/vue3';
import Logo from './logo.vue';

const meta = {
	component: Logo,
	title: 'Atoms/Logo',
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colorful: Story = {
	argTypes: {
		monochrome: {
			type: 'boolean',
		},
	},
	args: {
		monochrome: false,
	},
};

export const Monochrome: Story = {
	argTypes: Colorful.argTypes,
	args: {
		monochrome: true,
	},
};
