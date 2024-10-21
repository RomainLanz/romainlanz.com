<script setup lang="ts">
	import { Head } from '@inertiajs/vue3';
	import Hero from '@rlanz/design-system/hero';
	import Link from '@rlanz/design-system/link';
</script>

<template>
	<Head title="Homepage" />

	<Hero />

	<section class="m-auto max-w-6xl px-4">
		<div class="flex items-baseline justify-between">
			<h3 class="text-5xl text-gray-800">Mes derniers articles</h3>

			<Link href="/articles">Tous</Link>
		</div>

		<div class="grid cols-2 gap-6">
			<!-- Articles -->
		</div>
	</section>
</template>
