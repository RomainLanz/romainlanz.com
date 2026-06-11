import { preview } from '../../../.storybook/preview';
import TopBar from './top_bar.vue';

const meta = preview.meta({
	component: TopBar,
	title: 'Organisms/TopBar',
	parameters: {
		layout: 'padded',
	},
});

export default meta;

export const Base = meta.story();

export const Connected = meta.story({
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
