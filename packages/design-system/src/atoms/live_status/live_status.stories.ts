import LiveStatus from './live_status.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: LiveStatus,
	title: 'Atoms/LiveStatus',
} satisfies Meta<typeof LiveStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
