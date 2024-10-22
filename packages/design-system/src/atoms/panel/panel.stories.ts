import Panel from './panel.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Panel,
	title: 'Atoms/Panel',
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
	},
};
