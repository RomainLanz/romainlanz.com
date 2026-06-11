import { preview } from '../../../.storybook/preview';
import ErrorCode, { ManagedErrorCode } from './error_code.vue';

const meta = preview.meta({
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
});

export default meta;

export const Base = meta.story();
