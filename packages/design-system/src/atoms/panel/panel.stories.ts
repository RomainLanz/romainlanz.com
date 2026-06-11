import { preview } from '../../../.storybook/preview';
import Panel from './panel.vue';

const meta = preview.meta({
	component: Panel,
	title: 'Atoms/Panel',
});

export default meta;

export const Base = meta.story({
	args: {
		default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
	},
});
