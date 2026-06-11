<script lang="ts" setup>
	import { tv, type VariantProps } from 'tailwind-variants';
	import { computed } from 'vue';
	import Icon from '../../atoms/icon/icon.vue';

	const props = defineProps<{
		type: NonNullable<AlertProps['type']>;
	}>();

	const alert = tv({
		slots: {
			base: 'flex items-start gap-2 rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-3 text-gray-800',
			icon: 'size-[20px] shrink-0 pt-[2px] text-gray-600',
		},

		variants: {
			type: {
				info: {
					base: 'border-cyan-800 bg-cyan-100 text-cyan-800',
					icon: 'text-cyan-600',
				},
				success: {
					base: 'border-lime-800 bg-lime-100 text-lime-800',
					icon: 'text-lime-600',
				},
				warning: {
					base: 'border-yellow-800 bg-yellow-200 text-yellow-800',
					icon: 'text-yellow-600',
				},
				danger: {
					base: 'border-red-800 bg-red-100 text-red-800',
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

	const iconName = computed(() => alertIconMap[props.type]);
	const { base, icon } = alert({ type: props.type });
</script>

<template>
	<div :class="base()" role="alert">
		<div :class="icon()">
			<Icon :name="iconName" />
		</div>

		<div :class="$style.content">
			<slot />
		</div>
	</div>
</template>

<style module>
	.content {
		& > * {
			margin-block: 1rem;
		}

		& > :first-child {
			margin-top: 0;
		}

		& > :last-child {
			margin-bottom: 0;
		}
	}
</style>
