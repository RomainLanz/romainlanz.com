<script lang="ts" setup>
	import heroImage from './hero.svg';
	import Highlight from '../highlight/highlight.vue';
</script>

<template>
	<section class="max-w-7xl px-4 my-38 m-auto">
		<div class="flex">
			<div class="flex flex-col gap-6">
				<h1 class="text-4xl sm:text-6xl lg:text-5xl">
					Apprenez le <Highlight color="red.300">JavaScript</Highlight> et
					<Highlight color="lime.300" :rotation="2">Node.js</Highlight> à travers différents articles et vidéos
				</h1>

				<div class="flex gap-4">
					<slot name="actions" />
				</div>
			</div>

			<img class="hidden lg:block mt-[10px]" :src="heroImage" alt="" />
		</div>
	</section>
</template>
