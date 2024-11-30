<script lang="ts">
	import type { InferPageProps } from '@adonisjs/inertia/types';
	import type UpdateArticleController from '#admin/articles/controllers/update_article_controller';
</script>

<script lang="ts" setup>
	import { useForm } from '@inertiajs/vue3';
	import Button from '@rlanz/design-system/button';
	import Field from '@rlanz/design-system/field';
	import FieldSelect from '@rlanz/design-system/field-select';
	import Panel from '@rlanz/design-system/panel';
	import { client } from '@rlanz/rpc/client';
	import { computed, ref } from 'vue';
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
		markdownContent: article!.content_markdown,
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
		const url = client.$url('admin.articles.update', { params: { id: article!.id } });

		form.categoryId = category.value[0];

		form.put(url, {});
	}
</script>

<template>
	<Panel class="bg-white">
		<form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
			<Field v-model="form.title" label="Titre" type="text" :error-message="form.errors.title?.[0]" />
			<Field v-model="form.summary" label="Résumé" type="text" :error-message="form.errors.summary?.[0]" />

			<FieldSelect
				v-model="category"
				label="Catégorie"
				placeholder="Choisir une catégorie"
				:items
				:error-message="form.errors.categoryId?.[0]"
			/>

			<Field v-model="form.markdownContent" class="min-h-6xl" label="Contenu" type="textarea"></Field>

			<div>
				<Button color="violet" type="submit">Mettre à jour</Button>
			</div>
		</form>
	</Panel>
</template>
