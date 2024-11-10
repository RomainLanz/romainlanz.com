import ErrorCode, { ManagedErrorCode } from './error_code.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	component: ErrorCode,
	title: 'Atoms/ErrorCode',
	args: {
		code: 404,
	},
	argTypes: {
		code: {
			options: ManagedErrorCode,
		},
	},
} as Meta<typeof ErrorCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
