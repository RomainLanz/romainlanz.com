import { preview } from '../../../.storybook/preview';
import LiveStatus from './live_status.vue';

const meta = preview.meta({
	component: LiveStatus,
	title: 'Atoms/LiveStatus',
});

export default meta;

export const Base = meta.story();
