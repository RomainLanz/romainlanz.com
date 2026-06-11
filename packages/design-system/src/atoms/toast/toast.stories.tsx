import { h } from 'vue';
import { preview } from '../../../.storybook/preview';
import Button from '../button/button.vue';
import { toaster } from './toaster.ts';
import Toaster from './toaster.vue';

const meta = preview.meta({
	component: Toaster,
	title: 'Atoms/Toast',
});

export default meta;

export const Base = meta.story({
	render: (args) => (
		<>
			{h(Button, { onClick: () => toaster.create({ title: 'Hello', description: 'World' }) }, () => 'Create Toast')}
			<Toaster {...args} />
		</>
	),
});
