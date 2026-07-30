<script lang="ts" setup>
	import { Data } from '@generated/data';
	import Button from '@rlanz/design-system/button';
	import { client } from '~/client';
	import CategoryTable from '~/components/admin/taxonomies/category_table.vue';
	import TagTable from '~/components/admin/taxonomies/tag_table.vue';
	import { usePageTitle } from '~/composables/use_page_title';

	const { vm } = defineProps<{
		vm: Data.Admin.Taxonomies.AdminTaxonomyIndex;
	}>();

	usePageTitle('Taxonomy');

	const newCategoryUrl = client.urlFor('admin.taxonomies.categories.create');
	const newTagUrl = client.urlFor('admin.taxonomies.tags.create');
</script>

<template>
	<div class="flex flex-col gap-8">
		<section class="flex flex-col gap-4">
			<div class="flex items-center justify-between gap-4">
				<h2>Catégories</h2>
				<Button color="violet" :href="newCategoryUrl">Créer</Button>
			</div>

			<CategoryTable :items="vm.categories" />
		</section>

		<section class="flex flex-col gap-4">
			<div class="flex items-center justify-between gap-4">
				<h2>Tags</h2>
				<Button color="violet" :href="newTagUrl">Créer</Button>
			</div>

			<TagTable :items="vm.tags" />
		</section>
	</div>
</template>
