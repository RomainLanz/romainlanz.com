<script lang="ts" setup>
	import { Data } from '@generated/data';
	import { useForm } from '@inertiajs/vue3';
	import Button from '@rlanz/design-system/button';
	import Field from '@rlanz/design-system/field';
	import FieldSelect from '@rlanz/design-system/field-select';
	import Panel from '@rlanz/design-system/panel';
	import { computed, ref } from 'vue';
	import { client } from '~/client';
	import MarkdownEditor from '~/components/admin/articles/markdown_editor.vue';
	import OgImagePreview from '~/components/admin/articles/og_image_preview.vue';
	import { usePageTitle } from '~/composables/use_page_title';

	const { categories } = defineProps<{
		categories: Data.Taxonomies.CategoryOption[];
	}>();

	usePageTitle('Écrire un article');

	const form = useForm({
		title: '',
		summary: '',
		markdownContent: '',
		publishedAt: '',
		categoryId: '',
	});

	const items = computed(() => {
		return categories.map((category) => ({
			value: category.id,
			label: category.name,
		}));
	});

	const category = ref<string[]>();

	function handleSubmit() {
		const url = client.urlFor('admin.articles.store');

		form.categoryId = category.value?.[0];

		form.post(url, {});
	}
</script>

<template>
	<Panel class="bg-white">
		<form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
			<Field v-model="form.title" label="Titre" type="text" :error-message="form.errors.title" />
			<Field v-model="form.summary" label="Résumé" type="text" :error-message="form.errors.summary" />
			<OgImagePreview :title="form.title" :summary="form.summary" />
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
				<Button color="violet" type="submit">Créer</Button>
			</div>
		</form>
	</Panel>
</template>
