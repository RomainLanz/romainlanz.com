import NewsletterForm from './newsletter_form.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: NewsletterForm,
	title: 'Organisms/NewsletterForm',
} satisfies Meta<typeof NewsletterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
