<script lang="ts" setup>
	import { tv, type VariantProps } from 'tailwind-variants';
	import { computed } from 'vue';

	const props = defineProps<{
		color?: TagProps['color'];
		href?: string;
	}>();

	const tag = tv({
		base: 'bg-white border border-solid border-gray-800 rounded-ms text-gray-800 tracking-wider text-xs uppercase py-1.5 px-2',

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
				link: 'cursor-pointer hover:shadow-tiny transition-shadow duration-200 transition-ease-in-out',
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
