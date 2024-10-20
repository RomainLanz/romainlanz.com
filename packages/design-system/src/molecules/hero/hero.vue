<script lang="ts" setup>
	import Button from '../../atoms/button/button.vue';
	import heroImage from './hero.svg';
</script>

<template>
	<section class="max-w-6xl px-4 my-38 m-auto">
		<div class="flex">
			<div class="flex flex-col gap-6">
				<h1 class="text-5xl">
					Apprenez le <span :class="$style.funny">JavaScript</span> <br />
					à travers différents articles et vidéos
				</h1>

				<div class="flex gap-4">
					<Button color="violet" href="/">Articles</Button>
					<Button color="yellow" href="/">Contact</Button>
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
