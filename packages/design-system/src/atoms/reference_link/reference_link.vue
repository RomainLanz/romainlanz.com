<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Icon from '../icon/icon.vue';

	const { prefetch = true } = defineProps<{
		href: string;
		prefetch?: boolean;
	}>();
</script>

<template>
	<Link
		class="block rounded-full bg-white p-1 text-yellow-500 transition-colors hover:bg-yellow-500 hover:text-white"
		:href
		:prefetch
	>
		<Icon class="size-3" name="link" />
	</Link>
</template>
