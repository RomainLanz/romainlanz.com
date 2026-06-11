import { preview } from '../../../.storybook/preview';
import Footer from './footer.vue';

const meta = preview.meta({
	component: Footer,
	title: 'Organisms/Footer',
	parameters: {
		layout: 'padded',
	},
});

export default meta;

export const Base = meta.story({
	args: {
		aboutHref: '#',
		contactHref: '#',
		homeHref: '#',
	},
});
