import { preview } from '../../../.storybook/preview';
import FieldSelect from './field_select.vue';

const meta = preview.meta({
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
});

export default meta;

export const Base = meta.story();
