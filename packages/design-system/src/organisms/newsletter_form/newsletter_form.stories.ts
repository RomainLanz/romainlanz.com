import { preview } from '../../../.storybook/preview';
import NewsletterForm from './newsletter_form.vue';

const meta = preview.meta({
	component: NewsletterForm,
	title: 'Organisms/NewsletterForm',
	argTypes: {
		open: { control: 'boolean' },
		loading: { control: 'boolean' },
		errorMessage: { control: 'text' },
	},
});

export default meta;

export const Base = meta.story({
	args: {
		email: '',
		open: false,
	},
});

export const AlreadyOpen = meta.story({
	args: {
		email: 'hello@romainlanz.com',
		open: true,
	},
});

export const AlreadyOpenWithError = meta.story({
	args: {
		email: 'hello@romainlanz.com',
		open: true,
		errorMessage: 'Incorrect email',
	},
});
