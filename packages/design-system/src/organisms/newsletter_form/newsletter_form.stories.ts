import NewsletterForm from './newsletter_form.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: NewsletterForm,
	title: 'Organisms/NewsletterForm',
	argTypes: {
		open: { control: 'boolean' },
		loading: { control: 'boolean' },
		errorMessage: { control: 'text' },
	},
} satisfies Meta<typeof NewsletterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		open: false,
	},
};

export const AlreadyOpen: Story = {
	args: {
		open: true,
	},
};

export const AlreadyOpenWithError: Story = {
	args: {
		open: true,
		errorMessage: 'Incorrect email',
	},
};
