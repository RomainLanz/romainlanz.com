import Hero from './hero.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: Hero,
	title: 'Molecules/Hero',
} as Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
