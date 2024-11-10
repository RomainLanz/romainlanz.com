<script setup lang="ts">
	import { Head } from '@inertiajs/vue3';
	import ArticleCard from '@rlanz/design-system/article-card';
	import Button from '@rlanz/design-system/button';
	import Hero from '@rlanz/design-system/hero';
	import Link from '@rlanz/design-system/link';
	import { client } from '@rlanz/rpc/client';
	import type { LandingViewModelSerialized } from '#pages/view_models/landing_view_model';

	defineProps<{
		vm: LandingViewModelSerialized;
	}>();

	const contactUrl = client.$url('pages.contact');
	const aboutUrl = client.$url('pages.about');
	const allArticlesUrl = client.$url('articles.index');
</script>

<template>
	<Head title="Apprenez le JavaScript, TypeScript et Node.js" />

	<Hero>
		<template #actions>
			<Button :href="contactUrl" color="violet">Contact</Button>
			<Button :href="aboutUrl" color="cyan">À propos</Button>
		</template>
	</Hero>

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
					:title="vm.articles[0].title"
					:slug="vm.articles[0].slug"
					:date="vm.articles[0].publishedAtHuman"
					:datetime="vm.articles[0].publishedAt"
					:excerpt="vm.articles[0].summary"
					:reading-time="5"
				/>

				<ArticleCard
					v-if="vm.articles[2]"
					:key="vm.articles[2].id"
					:title="vm.articles[2].title"
					:slug="vm.articles[2].slug"
					:date="vm.articles[2].publishedAtHuman"
					:datetime="vm.articles[2].publishedAt"
					:excerpt="vm.articles[2].summary"
					:reading-time="5"
				/>
			</div>
			<div class="flex flex-col gap-6 lg:w-1/2">
				<ArticleCard
					v-if="vm.articles[1]"
					:key="vm.articles[1].id"
					:title="vm.articles[1].title"
					:slug="vm.articles[1].slug"
					:date="vm.articles[1].publishedAtHuman"
					:datetime="vm.articles[1].publishedAt"
					:excerpt="vm.articles[1].summary"
					:reading-time="5"
				/>

				<ArticleCard
					v-if="vm.articles[3]"
					:key="vm.articles[3].id"
					:title="vm.articles[3].title"
					:slug="vm.articles[3].slug"
					:date="vm.articles[3].publishedAtHuman"
					:datetime="vm.articles[3].publishedAt"
					:excerpt="vm.articles[3].summary"
					:reading-time="5"
				/>
			</div>
		</div>
	</section>
</template>
