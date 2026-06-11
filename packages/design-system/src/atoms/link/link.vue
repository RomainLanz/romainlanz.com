<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';

	const { prefetch = false } = defineProps<{
		href: string;
		prefetch?: boolean;
	}>();
</script>

<template>
	<Link
		class="relative text-xs font-bold tracking-wider text-gray-800 uppercase"
		:class="$style.linkHover"
		:href="href"
		:prefetch="prefetch"
	>
		<slot />
	</Link>
</template>

<style module>
	.linkHover:hover:before {
		background-color: var(--color-yellow-400);
		content: '';
		height: 7px;
		bottom: 1px;
		margin-left: -2.5%;
		position: absolute;
		width: 105%;
		z-index: -1;
	}
</style>
