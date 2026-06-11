import { IllustrationName } from '../../atoms/illustration/illustration_name.js';
import Headline from './headline.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Headline,
	title: 'Molecules/Headline',

	argTypes: {
		category: {
			options: IllustrationName,
		},
	},
} satisfies Meta<typeof Headline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		title: 'Twitter Cropping Vertical Video the right way!',
		publishedAt: '3 avr. 1994',
		publishedAtDatetime: '1994-04-03T00:00:00Z',
		category: 'design-pattern',
		readingTime: 5,
		tags: [{ name: 'JavaScript', color: 'yellow' }],
	},
};
