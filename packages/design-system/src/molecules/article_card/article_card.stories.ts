import ArticleCard from './article_card.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: ArticleCard,
	title: 'Molecules/Article Card',
} as Meta<typeof ArticleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		slug: 'article-title',
		title: 'Article Title',
		date: new Date(),
		excerpt:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.',
		readingTime: 5,
		tags: [{ name: 'JavaScript', color: 'yellow' }],
	},
};
