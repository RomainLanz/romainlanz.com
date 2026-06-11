import { preview } from '../../../.storybook/preview';
import Checkbox from './checkbox.vue';

const meta = preview.meta({
	component: Checkbox,
	title: 'Atoms/Checkbox',
});

export default meta;

export const Base = meta.story();

export const WithLabel = meta.story({
	args: {
		label: 'Se souvenir de moi',
	},
});
