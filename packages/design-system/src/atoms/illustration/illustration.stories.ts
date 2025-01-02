import { IllustrationName } from './illustration_name.js';
import Illustration from './illustration.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Illustration,
	title: 'Atoms/Illustration',
	argTypes: {
		name: {
			options: IllustrationName,
		},
	},
} satisfies Meta<typeof Illustration>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		name: 'adonis',
	},
};
