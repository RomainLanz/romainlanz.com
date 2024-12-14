import ReferenceLink from './reference_link.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
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
} satisfies Meta<typeof ReferenceLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
