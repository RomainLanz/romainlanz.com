import { preview } from '../../../.storybook/preview';
import Link from './link.vue';

const meta = preview.meta({
	component: Link,
	title: 'Atoms/Link',
	argTypes: {
		href: {
			type: 'string',
		},
		default: {
			type: 'string',
		},
	},
});

export default meta;

export const Base = meta.story({
	args: {
		href: '#',
		default: 'View all',
	},
});
