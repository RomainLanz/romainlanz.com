<script lang="ts">
	import { tv, type VariantProps } from 'tailwind-variants';

	const button = tv({
		base: 'inline-block cursor-pointer text-base font-bold bg-transparent hover:bg-white rounded-lg border-2 border-solid border-gray-800 shadow-small transition-colors',

		variants: {
			color: {
				cyan: 'bg-cyan-300 hover:bg-cyan-500',
				violet: 'bg-violet-300 hover:bg-violet-500',
				red: 'bg-red-300 hover:bg-red-500',
				yellow: 'bg-yellow-300 hover:bg-yellow-500',
				lime: 'bg-lime-300 hover:bg-lime-500',
			},

			size: {
				small: 'py-2 px-3',
				medium: 'py-3 px-5',
			},
		},

		defaultVariants: {
			size: 'medium',
		},
	});

	type ButtonProps = VariantProps<typeof button>;
</script>

<script lang="ts" setup>
	import { computed } from 'vue';
	import { Link } from '@inertiajs/vue3';

	const props = defineProps<{
		color?: ButtonProps['color'];
		href?: string;
		size?: ButtonProps['size'];
	}>();

	const buttonOrLink = computed(() => {
		return props.href ? Link : 'button';
	});
</script>

<template>
	<Component
		v-bind="$attrs"
		:is="buttonOrLink"
		:class="
			button({
				color: props.color,
				size: props.size,
			})
		"
	>
		<slot />
	</Component>
</template>
