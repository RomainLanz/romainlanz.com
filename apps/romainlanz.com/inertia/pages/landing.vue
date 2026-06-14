<script setup lang="ts">
	import { Data } from '@generated/data';
	import { Head } from '@inertiajs/vue3';
	import ArticleCard from '@rlanz/design-system/article-card';
	import Button from '@rlanz/design-system/button';
	import Link from '@rlanz/design-system/link';
	import { client } from '~/client';
	import LandingHero from '~/components/landing/landing_hero.vue';

	defineProps<{
		vm: Data.Pages.LandingPage;
	}>();

	const allArticlesUrl = client.urlFor('articles.index');
	const aboutUrl = client.urlFor('pages.about');
	const contactUrl = client.urlFor('pages.contact');

	function computeArticleHref(slug: string) {
		return client.urlFor('articles.show', { slug });
	}
</script>

<template>
	<Head title="Apprenez le JavaScript, TypeScript et Node.js" />

	<LandingHero>
		<template #actions>
			<Button :href="contactUrl" color="violet">Contact</Button>
			<Button :href="aboutUrl" color="cyan">À propos</Button>
		</template>
	</LandingHero>

	<section class="m-auto max-w-7xl px-4">
		<div class="mb-10 flex items-baseline justify-between">
			<h3 class="text-5xl text-gray-800">Mes derniers articles</h3>

			<Link :href="allArticlesUrl" prefetch>Tous</Link>
		</div>

		<div class="flex flex-col gap-6 lg:flex-row">
			<div class="flex flex-col gap-6 lg:w-1/2">
				<ArticleCard
					v-if="vm.articles[0]"
					:key="vm.articles[0].id"
					:href="computeArticleHref(vm.articles[0].slug)"
					:title="vm.articles[0].title"
					:date="vm.articles[0].publishedAtHuman"
					:datetime="vm.articles[0].publishedAt"
					:excerpt="vm.articles[0].summary"
					:reading-time="vm.articles[0].readingTime"
				/>

				<ArticleCard
					v-if="vm.articles[2]"
					:key="vm.articles[2].id"
					:href="computeArticleHref(vm.articles[2].slug)"
					:title="vm.articles[2].title"
					:date="vm.articles[2].publishedAtHuman"
					:datetime="vm.articles[2].publishedAt"
					:excerpt="vm.articles[2].summary"
					:reading-time="vm.articles[2].readingTime"
				/>
			</div>
			<div class="flex flex-col gap-6 lg:w-1/2">
				<ArticleCard
					v-if="vm.articles[1]"
					:key="vm.articles[1].id"
					:href="computeArticleHref(vm.articles[1].slug)"
					:title="vm.articles[1].title"
					:date="vm.articles[1].publishedAtHuman"
					:datetime="vm.articles[1].publishedAt"
					:excerpt="vm.articles[1].summary"
					:reading-time="vm.articles[1].readingTime"
				/>

				<ArticleCard
					v-if="vm.articles[3]"
					:key="vm.articles[3].id"
					:href="computeArticleHref(vm.articles[3].slug)"
					:title="vm.articles[3].title"
					:date="vm.articles[3].publishedAtHuman"
					:datetime="vm.articles[3].publishedAt"
					:excerpt="vm.articles[3].summary"
					:reading-time="vm.articles[3].readingTime"
				/>
			</div>
		</div>
	</section>
</template>
