<script lang="ts">
	import { tv, type VariantProps } from 'tailwind-variants';

	const alert = tv({
		slots: {
			base: 'flex items-start bg-transparent rounded-lg border-2 border-solid border-gray-800 text-gray-800 gap-2 py-3 px-4',
			icon: 'text-gray-600 shrink-0 size-[20px] pt-[2px]',
		},

		variants: {
			type: {
				info: {
					base: 'bg-cyan-100 border-cyan-800 text-cyan-800',
					icon: 'text-cyan-600',
				},
				success: {
					base: 'bg-lime-100 border-lime-800 text-lime-800',
					icon: 'text-lime-600',
				},
				warning: {
					base: 'bg-yellow-200 border-yellow-800 text-yellow-800',
					icon: 'text-yellow-600',
				},
				danger: {
					base: 'bg-red-100 border-red-800 text-red-800',
					icon: 'text-red-600',
				},
			},
		},
	});

	const alertIconMap = {
		info: 'info',
		success: 'success',
		warning: 'danger',
		danger: 'close-large',
	} as const;

	type AlertProps = VariantProps<typeof alert>;
</script>

<script lang="ts" setup>
	import Icon from '../../atoms/icon/icon.vue';
	import { computed } from 'vue';

	const props = defineProps<{
		type: NonNullable<AlertProps['type']>;
	}>();

	const iconName = computed(() => alertIconMap[props.type]);
	const { base, icon } = alert({ type: props.type });
</script>

<template>
	<div :class="base()" role="alert">
		<div :class="icon()">
			<Icon :name="iconName" />
		</div>

		<slot />
	</div>
</template>
