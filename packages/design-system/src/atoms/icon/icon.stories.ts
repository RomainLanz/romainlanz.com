import { preview } from '../../../.storybook/preview';
import Icon, { IconName } from './icon.vue';

const meta = preview.meta({
	component: Icon,
	title: 'Atoms/Icon',
});

export default meta;

export const Base = meta.story({
	argTypes: {
		name: {
			options: IconName,
		},
	},
	args: {
		name: 'close',
	},
});
