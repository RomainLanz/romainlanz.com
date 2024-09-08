import Checkbox from './checkbox.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Checkbox,
	title: 'Atoms/Checkbox',
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const WithLabel: Story = {
	args: {
		label: 'Se souvenir de moi',
	},
};
