import TopBar from './top_bar.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: TopBar,
	title: 'Organisms/TopBar',
	parameters: {
		layout: 'padded',
	},
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const Connected: Story = {
	argTypes: {
		user: {
			name: 'Romain Lanz',
			avatarUrl: 'https://avatars.githubusercontent.com/u/2793951?v=4',
			isAdmin: true,
		},
	},
	args: {
		user: {
			name: 'Romain Lanz',
			avatarUrl: 'https://avatars.githubusercontent.com/u/2793951?v=4',
			isAdmin: true,
		},
	},
};
