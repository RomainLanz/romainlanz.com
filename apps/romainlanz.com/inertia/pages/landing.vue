<script setup lang="ts">
	import { Head } from '@inertiajs/vue3';
	import ArticleCard from '@rlanz/design-system/article-card';
	import Hero from '@rlanz/design-system/hero';
	import Link from '@rlanz/design-system/link';
	import { client } from '@rlanz/rpc/client';
	import { computed } from 'vue';

	defineProps<{
		articles: any[];
	}>();

	const allArticlesUrl = computed(() => {
		return client.$url('articles.index');
	});
</script>

<template>
	<Head title="Homepage" />

	<Hero />

	<section class="m-auto max-w-6xl px-4">
		<div class="flex items-baseline justify-between">
			<h3 class="text-5xl text-gray-800">Mes derniers articles</h3>

			<Link :href="allArticlesUrl" prefetch>Tous</Link>
		</div>

		<div class="grid cols-2 gap-6">
			<ArticleCard
				v-for="article in articles"
				:key="article.id"
				:title="article.title"
				:slug="article.slug"
				:date="article.published_at"
				:excerpt="article.description"
				:reading-time="5"
			/>
		</div>
	</section>
</template>
