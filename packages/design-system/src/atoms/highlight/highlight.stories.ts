import { preview } from '../../../.storybook/preview';
import Highlight from './highlight.vue';

const meta = preview.meta({
	component: Highlight,
	title: 'Atoms/Highlight',
	args: {
		color: 'red.300',
		default: 'JavaScript',
	},
});

export default meta;

export const Base = meta.story();
