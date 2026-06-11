import { preview } from '../../../.storybook/preview';
import CategoryListing from './category_listing.vue';

const args = {
	allHref: '#',
	allArticlesCount: 24,
	activeCategory: null,
	categories: [
		{
			id: '2',
			name: 'Productivity',
			slug: 'productivity',
			illustrationName: 'productivity' as const,
			articleCount: 16,
		},
		{
			id: '3',
			name: 'JavaScript',
			slug: 'javascript',
			illustrationName: 'javascript' as const,
			articleCount: 2,
		},
	],
	categoryHref: () => '#',
};

const meta = preview.meta({
	component: CategoryListing,
	title: 'Molecules/CategoryListing',
});

export default meta;

export const Base = meta.story({
	args,
});
