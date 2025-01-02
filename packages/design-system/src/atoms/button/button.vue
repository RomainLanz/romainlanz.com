<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import { tv, type VariantProps } from 'tailwind-variants';
	import { computed } from 'vue';

	const {
		href,
		prefetch = false,
		disabled = false,
	} = defineProps<{
		color?: ButtonProps['color'];
		href?: string;
		prefetch?: boolean;
		flat?: ButtonProps['flat'];
		size?: ButtonProps['size'];
		disabled?: boolean;
	}>();

	const button = tv({
		base: 'inline-block flex items-center justify-center cursor-pointer text-base font-bold bg-off-white hover:bg-yellow-100 rounded-lg transition-colors',

		variants: {
			color: {
				cyan: 'bg-cyan-300 hover:bg-cyan-500',
				violet: 'bg-violet-300 hover:bg-violet-500',
				red: 'bg-red-300 hover:bg-red-500',
				yellow: 'bg-yellow-300 hover:bg-yellow-500',
				lime: 'bg-lime-300 hover:bg-lime-500',
			},

			size: {
				extraSmall: 'py-1 px-4',
				small: 'py-2 px-3',
				medium: 'py-3 px-5',
			},

			flat: {
				true: 'border-0 shadow-none',
				false: 'border-2 border-solid border-gray-800 shadow-small',
			},

			disabled: {
				true: 'cursor-not-allowed opacity-80',
				false: '',
			},
		},

		defaultVariants: {
			size: 'medium',
		},
	});

	type ButtonProps = VariantProps<typeof button>;

	const buttonOrLink = computed(() => {
		return href ? Link : 'button';
	});
</script>

<template>
	<Component
		v-bind="$attrs"
		:is="buttonOrLink"
		:class="
			button({
				color,
				size,
				flat,
				disabled,
			})
		"
		:href
		:prefetch
		:disabled
	>
		<slot />
	</Component>
</template>
