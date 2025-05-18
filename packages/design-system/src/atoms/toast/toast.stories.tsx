import Button from '../button/button.vue';
import { toaster } from './toaster.ts';
import Toaster from './toaster.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Toaster,
	title: 'Atoms/Toast',
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	render: (args) => (
		<>
			<Button onClick={() => toaster.create({ title: 'Hello', description: 'World' })}>Create Toast</Button>
			<Toaster {...args} />
		</>
	),
};
