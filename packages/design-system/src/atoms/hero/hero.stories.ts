import { preview } from '../../../.storybook/preview';
import Hero from './hero.vue';

const meta = preview.meta({
	component: Hero,
	title: 'Atoms/Hero',
});

export default meta;

export const Base = meta.story();
