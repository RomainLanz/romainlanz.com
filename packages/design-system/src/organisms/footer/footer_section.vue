<script lang="ts" setup>
	defineProps<{
		title: string;
	}>();
</script>

<template>
	<section>
		<h4 class="relative text-xs w-min mb-3" :class="$style.title">{{ title }}</h4>

		<slot />
	</section>
</template>

<style module>
	.title:before {
		background-color: theme('colors.yellow.500');
		content: '';
		height: 6px;
		bottom: 0;
		margin-left: -2.5%;
		position: absolute;
		width: 105%;
		z-index: -1;
	}
</style>
