import { preview } from '../../../.storybook/preview';
import Field from './field.vue';

const meta = preview.meta({
	component: Field,
	title: 'Molecules/Field',
	argTypes: {
		label: {
			type: 'string',
		},
		errorMessage: {
			type: 'string',
		},
		helpMessage: {
			type: 'string',
		},
	},
});

export default meta;

export const Base = meta.story();

export const Textarea = meta.story({
	args: {
		type: 'textarea',
	},
});

export const WithLabel = meta.story({
	args: {
		label: 'Label',
	},
});

export const WithErrorMessage = meta.story({
	args: {
		errorMessage: 'Error message',
	},
});

export const WithHelpMessage = meta.story({
	args: {
		helpMessage: 'Help message',
	},
});
