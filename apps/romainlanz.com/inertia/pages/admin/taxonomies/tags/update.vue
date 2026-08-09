<script lang="ts">
	import type UpdateTagController from '#admin/taxonomies/controllers/update_tag_controller';
	import type { InferPageProps } from '@adonisjs/inertia/types';
</script>

<script lang="ts" setup>
	import { useForm } from '@inertiajs/vue3';
	import Button from '@rlanz/design-system/button';
	import Field from '@rlanz/design-system/field';
	import FieldSelect from '@rlanz/design-system/field-select';
	import Panel from '@rlanz/design-system/panel';
	import { tagColors } from '@rlanz/design-system/tag-color';
	import { ref } from 'vue';
	import { client } from '~/client';
	import { usePageTitle } from '~/composables/use_page_title';

	type Tag = NonNullable<InferPageProps<UpdateTagController, 'render'>['tag']>;

	const { tag } = defineProps<{ tag: Tag }>();

	usePageTitle('Modifier un tag');

	const form = useForm({
		name: tag.name,
		slug: tag.slug,
		color: tag.color,
	});
	const color = ref<string[]>([form.color]);
	const colors = tagColors.map((tagColor) => ({
		label: tagColor,
		value: tagColor,
	}));

	function handleSubmit() {
		form.color = color.value[0] ?? '';
		form.put(client.urlFor('admin.taxonomies.tags.update', { id: tag.id }));
	}
</script>

<template>
	<Panel>
		<form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
			<Field v-model="form.name" label="Nom" type="text" :error-message="form.errors.name" />
			<Field v-model="form.slug" label="Slug" type="text" :error-message="form.errors.slug" />
			<FieldSelect
				v-model="color"
				label="Couleur"
				placeholder="Choisir une couleur"
				:items="colors"
				:error-message="form.errors.color"
			/>

			<div>
				<Button color="violet" type="submit">Mettre à jour</Button>
			</div>
		</form>
	</Panel>
</template>
