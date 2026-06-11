import { preview } from '../../../.storybook/preview';
import Tag from './tag.vue';

const argTypes = {
	color: {
		options: ['cyan', 'violet', 'red', 'yellow', 'lime'],
	},
	default: {
		type: 'string',
	},
} as const;

const args = {
	default: 'Database',
};

const meta = preview.meta({
	component: Tag,
	title: 'Atoms/Tag',
});

export default meta;

export const Base = meta.story({
	argTypes,
	args,
});

export const Link = meta.story({
	argTypes,
	args: {
		...args,
		href: 'https://romainlanz.com',
	},
});
