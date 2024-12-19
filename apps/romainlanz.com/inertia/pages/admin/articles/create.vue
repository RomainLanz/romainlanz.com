<script lang="ts" setup>
	import { useForm } from '@inertiajs/vue3';
	import Button from '@rlanz/design-system/button';
	import Field from '@rlanz/design-system/field';
	import FieldSelect from '@rlanz/design-system/field-select';
	import Panel from '@rlanz/design-system/panel';
	import { client } from '@rlanz/rpc/client';
	import { computed, ref } from 'vue';
	import { usePageTitle } from '~/composables/use_page_title';

	const { categories } = defineProps<{
		categories: any[];
	}>();

	usePageTitle('Écrire un article');

	const form = useForm({
		title: '',
		summary: '',
		markdownContent: '',
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
		const url = client.$url('admin.articles.store');

		form.categoryId = category.value?.[0];

		form.post(url, {});
	}
</script>

<template>
	<Panel>
		<form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
			<Field v-model="form.title" label="Titre" type="text" :error-message="form.errors.title" />
			<Field v-model="form.summary" label="Résumé" type="text" :error-message="form.errors.summary" />

			<FieldSelect
				v-model="category"
				label="Catégorie"
				placeholder="Choisir une catégorie"
				:items
				:error-message="form.errors.categoryId"
			/>

			<textarea
				v-model="form.markdownContent"
				class="h-64 w-full"
				:class="{ 'border-red-500': form.errors.markdownContent }"
			></textarea>

			<div>
				<Button color="violet" type="submit">Créer</Button>
			</div>
		</form>
	</Panel>
</template>
