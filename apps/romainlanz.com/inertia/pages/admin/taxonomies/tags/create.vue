<script lang="ts" setup>
	import { useForm } from '@inertiajs/vue3';
	import Button from '@rlanz/design-system/button';
	import Field from '@rlanz/design-system/field';
	import FieldSelect from '@rlanz/design-system/field-select';
	import Panel from '@rlanz/design-system/panel';
	import { tagColors } from '@rlanz/design-system/tag-color';
	import { ref, watch } from 'vue';
	import { client } from '~/client';
	import { usePageTitle } from '~/composables/use_page_title';

	usePageTitle('Créer un tag');

	const form = useForm({
		name: '',
		slug: '',
		color: 'cyan',
	});
	const slugWasEdited = ref(false);
	const color = ref<string[]>([form.color]);
	const colors = tagColors.map((tagColor) => ({
		label: tagColor,
		value: tagColor,
	}));

	watch(
		() => form.name,
		(value) => {
			if (!slugWasEdited.value) {
				form.slug = generateSlug(value);
			}
		},
	);

	function handleSlugInput(value: string) {
		form.slug = value;
		slugWasEdited.value = value !== generateSlug(form.name);
	}

	function handleSubmit() {
		form.color = color.value[0] ?? '';
		form
			.transform(({ name, slug, color }) => ({
				name,
				color,
				...(slugWasEdited.value ? { slug } : {}),
			}))
			.post(client.urlFor('admin.taxonomies.tags.store'));
	}

	function generateSlug(value: string) {
		return value
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}
</script>

<template>
	<Panel>
		<form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
			<Field v-model="form.name" label="Nom" type="text" :error-message="form.errors.name" />
			<Field
				:model-value="form.slug"
				label="Slug"
				type="text"
				:error-message="form.errors.slug"
				@update:model-value="handleSlugInput"
			/>
			<FieldSelect
				v-model="color"
				label="Couleur"
				placeholder="Choisir une couleur"
				:items="colors"
				:error-message="form.errors.color"
			/>

			<div>
				<Button color="violet" type="submit">Créer</Button>
			</div>
		</form>
	</Panel>
</template>
