import { IllustrationName } from '../../atoms/illustration/illustration.vue';
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
		publishedAt: new Date('1994-04-03'),
		category: 'design-pattern',
		readingTime: 5,
		tags: [{ name: 'JavaScript', color: 'yellow' }],
	},
};
