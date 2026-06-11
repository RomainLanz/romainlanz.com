import { preview } from '../../../.storybook/preview';
import Avatar from './avatar.vue';

const meta = preview.meta({
	component: Avatar,
	title: 'Atoms/Avatar',
});

export default meta;

export const Base = meta.story({
	args: {
		url: 'https://avatars.githubusercontent.com/u/2793951?v=4',
	},
});
