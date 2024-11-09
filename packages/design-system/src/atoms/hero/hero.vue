<script lang="ts" setup>
	import heroImage from './hero.svg';
	import Highlight from '../highlight/highlight.vue';
</script>

<template>
	<section class="max-w-7xl px-4 my-38 m-auto">
		<div class="flex">
			<div class="flex flex-col gap-6">
				<h1 class="text-5xl">
					Apprenez le <Highlight color="red.300">JavaScript</Highlight> <br />
					et <Highlight color="lime.300" :rotation="2">Node.js</Highlight> à travers différents articles et vidéos
				</h1>

				<div class="flex gap-4">
					<slot name="actions" />
				</div>
			</div>

			<img class="mt-[10px]" :src="heroImage" alt="" />
		</div>
	</section>
</template>

<style module>
	.funny {
		position: relative;
		display: inline-block;

		&:before {
			background-color: theme('colors.red.300');
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
