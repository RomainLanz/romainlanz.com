import CategoryListing from './category_listing.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: CategoryListing,
	title: 'Molecules/CategoryListing',
	args: {
		allArticlesCount: 24,
		activeCategory: null,
		categories: [
			{
				id: '2',
				name: 'Productivity',
				slug: 'productivity',
				illustrationName: 'productivity',
				articleCount: 16,
			},
			{
				id: '3',
				name: 'JavaScript',
				slug: 'javascript',
				illustrationName: 'javascript',
				articleCount: 2,
			},
		],
	},
} satisfies Meta<typeof CategoryListing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
