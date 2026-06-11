import { preview } from '../../../.storybook/preview';
import ArticleCard from './article_card.vue';

const meta = preview.meta({
	component: ArticleCard,
	title: 'Molecules/Article Card',
});

export default meta;

export const Base = meta.story({
	args: {
		href: '#',
		title: 'Article Title',
		date: '3 sept. 2024',
		datetime: '2024-09-03T00:00:00Z',
		excerpt:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.',
		readingTime: 5,
		tags: [{ name: 'JavaScript', color: 'yellow' }],
	},
});
