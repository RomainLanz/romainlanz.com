import Pagination from './pagination.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Pagination,
	title: 'Molecules/Pagination',
	args: {
		activePage: 1,
		count: 30,
	},
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
