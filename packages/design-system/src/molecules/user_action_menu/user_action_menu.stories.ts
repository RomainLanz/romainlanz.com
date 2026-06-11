import { preview } from '../../../.storybook/preview';
import UserActionMenu from './user_action_menu.vue';

const meta = preview.meta({
	component: UserActionMenu,
	title: 'Molecules/UserActionMenu',
});

export default meta;

export const Base = meta.story({
	argTypes: {
		user: {
			name: 'Romain Lanz',
			avatarUrl: 'https://avatars.githubusercontent.com/u/2793951?v=4',
			isAdmin: true,
		},
	},
	args: {
		adminHref: '#',
		user: {
			name: 'Romain Lanz',
			avatarUrl: 'https://avatars.githubusercontent.com/u/2793951?v=4',
			isAdmin: true,
		},
	},
});
