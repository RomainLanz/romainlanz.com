<script lang="ts">
	import { tv, type VariantProps } from 'tailwind-variants';

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

	const { href, prefetch = false } = defineProps<{
		color?: ButtonProps['color'];
		href?: string;
		prefetch?: boolean;
		flat?: ButtonProps['flat'];
		size?: ButtonProps['size'];
	}>();

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
			})
		"
		:href="href"
		:prefetch="prefetch"
	>
		<slot />
	</Component>
</template>
