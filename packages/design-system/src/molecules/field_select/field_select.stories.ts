import FieldSelect from './field_select.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: FieldSelect,
	title: 'Molecules/FieldSelect',
	args: {
		items: [
			{ label: 'AdonisJS', value: 'adonisjs' },
			{ label: 'Vue.js', value: 'vuejs' },
			{ label: 'React', value: 'react' },
		],
	},
	argTypes: {
		label: {
			type: 'string',
		},
		placeholder: {
			type: 'string',
		},
		errorMessage: {
			type: 'string',
		},
		helpMessage: {
			type: 'string',
		},
	},
} satisfies Meta<typeof FieldSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
