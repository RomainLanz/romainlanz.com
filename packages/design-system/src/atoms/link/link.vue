<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';

	defineProps<{
		href: string;
	}>();
</script>

<template>
	<Link
		class="relative text-gray-800 uppercase font-bold text-xs tracking-wider"
		:class="$style.linkHover"
		:href="href"
	>
		<slot />
	</Link>
</template>

<style module>
	.linkHover:hover:before {
		background-color: theme('colors.yellow.400');
		content: '';
		height: 7px;
		bottom: 1px;
		margin-left: -2.5%;
		position: absolute;
		width: 105%;
		z-index: -1;
	}
</style>
