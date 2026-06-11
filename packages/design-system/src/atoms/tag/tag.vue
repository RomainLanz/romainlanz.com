<script lang="ts" setup>
	import { tv, type VariantProps } from 'tailwind-variants';
	import { computed } from 'vue';

	const props = defineProps<{
		color?: TagProps['color'];
		href?: string;
	}>();

	const tag = tv({
		base: 'rounded-ms border border-solid border-gray-800 bg-white px-2 py-1.5 text-xs tracking-wider text-gray-800 uppercase',

		variants: {
			color: {
				cyan: 'bg-cyan-300',
				violet: 'bg-violet-300',
				red: 'bg-red-300',
				yellow: 'bg-yellow-300',
				lime: 'bg-lime-300',
			},

			type: {
				span: '',
				link: 'hover:shadow-tiny transition-ease-in-out cursor-pointer transition-shadow duration-200',
			},
		},

		defaultVariants: {
			type: 'span',
		},
	});

	export type TagProps = VariantProps<typeof tag>;

	const spanOrLink = computed(() => {
		return props.href ? 'a' : 'span';
	});
</script>

<template>
	<Component
		v-bind="$attrs"
		:is="spanOrLink"
		:class="
			tag({
				color: props.color,
				type: props.href ? 'link' : 'span',
			})
		"
	>
		<slot />
	</Component>
</template>
