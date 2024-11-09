<script lang="ts" setup>
	import delve from 'dlv';
	import { colors } from '../../tokens.js';
	import { computed } from 'vue';

	const { color } = defineProps<{
		color: string;
	}>();

	const colorHex = computed(() => delve(colors, color));
</script>

<template>
	<span :class="$style.funny">
		<slot />
	</span>
</template>

<style module>
	.funny {
		position: relative;
		display: inline-block;

		&:before {
			background-color: v-bind(colorHex);
			content: '';
			height: 95%;
			margin-left: -2.5%;
			position: absolute;
			transform: rotate(-2deg);
			transition: transform 300ms ease-in-out;
			width: 105%;
			will-change: transform;
			z-index: -1;
		}

		&:hover:before {
			transform: rotate(0deg);
		}
	}
</style>
