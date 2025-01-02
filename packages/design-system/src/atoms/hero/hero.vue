<script lang="ts" setup>
	import Highlight from '../highlight/highlight.vue';
	import heroImage from './hero.svg';
</script>

<template>
	<section class="m-auto my-38 max-w-7xl px-4">
		<div class="flex">
			<div class="flex flex-col gap-6">
				<h1 class="text-4xl lg:text-5xl sm:text-6xl">
					Apprenez le <Highlight color="red.300">JavaScript</Highlight>,
					<Highlight color="cyan.300">TypeScript</Highlight> et
					<Highlight color="lime.300" :rotation="2">Node.js</Highlight> à travers différents articles et vidéos
				</h1>

				<p class="text-xl">
					Je suis Romain Lanz, développeur full-stack avec plus de 10 ans d'expérience. Sur ce site, je partage mes
					connaissances et mes techniques pour vous aider à progresser.
				</p>

				<div class="flex gap-4">
					<slot name="actions" />
				</div>
			</div>

			<img class="mt-[10px] hidden lg:block" :src="heroImage" alt="" />
		</div>
	</section>
</template>
