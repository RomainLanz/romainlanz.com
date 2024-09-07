import Avatar from './avatar.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Avatar,
	title: 'Atoms/Avatar',
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		url: 'https://avatars.githubusercontent.com/u/2793951?v=4',
	},
};
