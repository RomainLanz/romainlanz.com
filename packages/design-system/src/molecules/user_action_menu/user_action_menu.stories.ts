import UserActionMenu from './user_action_menu.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: UserActionMenu,
	title: 'Molecules/UserActionMenu',
} satisfies Meta<typeof UserActionMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
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
