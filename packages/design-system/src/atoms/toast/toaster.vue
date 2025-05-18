<script lang="ts" setup>
	import {
		ToastRoot,
		ToastTitle,
		ToastDescription,
		ToastActionTrigger,
		ToastCloseTrigger,
		Toaster,
	} from '@ark-ui/vue/toast';
	import { tv } from 'tailwind-variants';
	import { toaster } from './toaster.ts';

	const toastClasses = tv({
		base: 'bg-off-white rounded-lg order-2 border-solid border-gray-800 shadow-small py-3 px-5 min-w-96',
	});
</script>

<template>
	<Toaster v-slot="toast" :toaster="toaster">
		<ToastRoot :key="toast.id" :class="[toastClasses(), $style.root]">
			<ToastTitle>{{ toast.title }}</ToastTitle>
			<ToastDescription>{{ toast.description }}</ToastDescription>
			<ToastActionTrigger v-if="toast.action">Action</ToastActionTrigger>
			<ToastCloseTrigger>Close</ToastCloseTrigger>
		</ToastRoot>
	</Toaster>
</template>

<style module>
	.root {
		height: var(--height);
		opacity: var(--opacity);
		scale: var(--scale);
		transition-duration: 200ms;
		transition-property: translate, scale, opacity, height;
		translate: var(--x) var(--y) 0;
		will-change: translate, scale, opacity, height;
		z-index: var(--z-index);
	}
</style>
