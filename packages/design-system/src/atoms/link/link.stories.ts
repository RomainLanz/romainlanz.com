import Link from './link.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
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
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		href: '#',
		default: 'View all',
	},
};
