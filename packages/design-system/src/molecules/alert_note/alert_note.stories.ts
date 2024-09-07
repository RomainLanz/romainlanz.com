import AlertNote from './alert_note.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: AlertNote,
	title: 'Molecules/AlertNote',
} satisfies Meta<typeof AlertNote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	argTypes: {
		type: {
			options: ['info', 'success', 'warning', 'danger'],
		},
		default: {
			type: 'string',
		},
	},
	args: {
		type: 'info',
		default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.',
	},
};

export const WithLongText: Story = {
	argTypes: {
		type: {
			options: ['info', 'success', 'warning', 'danger'],
		},
		default: {
			type: 'string',
		},
	},
	args: {
		type: 'info',
		default:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.',
	},
};
