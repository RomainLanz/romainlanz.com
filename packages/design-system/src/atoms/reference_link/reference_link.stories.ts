import { preview } from '../../../.storybook/preview';
import ReferenceLink from './reference_link.vue';

const meta = preview.meta({
	component: ReferenceLink,
	title: 'Atoms/Reference Link',
	argTypes: {
		href: {
			type: 'string',
		},
	},
	args: {
		href: '#',
	},
});

export default meta;

export const Base = meta.story();
