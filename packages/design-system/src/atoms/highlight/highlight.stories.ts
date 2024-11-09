import Highlight from './highlight.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Highlight,
	title: 'Atoms/Highlight',
	args: {
		color: 'red.300',
		default: 'JavaScript',
	},
} as Meta<typeof Highlight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
