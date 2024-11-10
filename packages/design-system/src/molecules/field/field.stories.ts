import Field from './field.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
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
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const Textarea: Story = {
	args: {
		type: 'textarea',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Label',
	},
};

export const WithErrorMessage: Story = {
	args: {
		errorMessage: 'Error message',
	},
};

export const WithHelpMessage: Story = {
	args: {
		helpMessage: 'Help message',
	},
};
