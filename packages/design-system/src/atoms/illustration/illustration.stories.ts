import { preview } from '../../../.storybook/preview';
import Illustration from './illustration.vue';
import { IllustrationName } from './illustration_name.js';

const meta = preview.meta({
	component: Illustration,
	title: 'Atoms/Illustration',
	argTypes: {
		name: {
			options: IllustrationName,
		},
	},
});

export default meta;

export const Base = meta.story({
	args: {
		name: 'adonis',
	},
});
