import { preview } from '../../../.storybook/preview';
import Pagination from './pagination.vue';

const meta = preview.meta({
	component: Pagination,
	title: 'Molecules/Pagination',
	args: {
		activePage: 1,
		count: 30,
	},
});

export default meta;

export const Base = meta.story();
