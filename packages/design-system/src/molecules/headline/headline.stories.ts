import { preview } from '../../../.storybook/preview';
import { IllustrationName } from '../../atoms/illustration/illustration_name.js';
import Headline from './headline.vue';

const meta = preview.meta({
	component: Headline,
	title: 'Molecules/Headline',

	argTypes: {
		category: {
			options: IllustrationName,
		},
	},
});

export default meta;

export const Base = meta.story({
	args: {
		title: 'Twitter Cropping Vertical Video the right way!',
		publishedAt: '3 avr. 1994',
		publishedAtDatetime: '1994-04-03T00:00:00Z',
		category: 'design-pattern',
		readingTime: 5,
		tags: [{ name: 'JavaScript', color: 'yellow' }],
	},
});
