import Footer from './footer.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Footer,
	title: 'Organisms/Footer',
	parameters: {
		layout: 'padded',
	},
} as Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
