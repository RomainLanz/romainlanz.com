<script lang="ts">
	import type UpdateArticleController from '#admin/articles/controllers/update_article_controller';
	import type { InferPageProps } from '@adonisjs/inertia/types';
</script>

<script lang="ts" setup>
	import { useForm } from '@inertiajs/vue3';
	import Button from '@rlanz/design-system/button';
	import Field from '@rlanz/design-system/field';
	import FieldSelect from '@rlanz/design-system/field-select';
	import Panel from '@rlanz/design-system/panel';
	import { computed, ref } from 'vue';
	import { client } from '~/client';
	import MarkdownEditor from '~/components/admin/articles/markdown_editor.vue';
	import { toDatetimeLocalInputValue } from '~/components/admin/articles/published_at';
	import { usePageTitle } from '~/composables/use_page_title';

	export interface Props {
		article: InferPageProps<UpdateArticleController, 'render'>['article'];
		categories: InferPageProps<UpdateArticleController, 'render'>['categories'];
	}

	const { article, categories } = defineProps<Props>();

	usePageTitle('Modifier un article');

	const form = useForm({
		title: article!.title,
		summary: article!.summary,
		slug: article!.slug,
		markdownContent: article!.content_markdown,
		publishedAt: toDatetimeLocalInputValue(article!.published_at),
		categoryId: article!.category_id,
	});

	const items = computed(() => {
		return categories.map((category) => ({
			value: category.id,
			label: category.name,
		}));
	});

	const category = ref<string[]>([article!.category_id]);

	function handleSubmit() {
		const url = client.urlFor('admin.articles.update', { id: article!.id });

		form.categoryId = category.value?.[0];

		form.put(url, {});
	}
</script>

<template>
	<Panel class="bg-white">
		<form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
			<Field v-model="form.title" label="Titre" type="text" :error-message="form.errors.title" />
			<Field v-model="form.summary" label="Résumé" type="text" :error-message="form.errors.summary" />
			<Field v-model="form.slug" label="Slug" type="text" :error-message="form.errors.slug" />
			<Field
				v-model="form.publishedAt"
				label="Date de publication"
				type="datetime-local"
				:error-message="form.errors.publishedAt"
			/>

			<FieldSelect
				v-model="category"
				label="Catégorie"
				placeholder="Choisir une catégorie"
				:items
				:error-message="form.errors.categoryId"
			/>

			<MarkdownEditor v-model="form.markdownContent" label="Contenu" :error-message="form.errors.markdownContent" />

			<div>
				<Button color="violet" type="submit">Mettre à jour</Button>
			</div>
		</form>
	</Panel>
</template>
