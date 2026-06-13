<script lang="ts" setup>
	import { Form } from '@adonisjs/inertia/vue';
	import Button from '@rlanz/design-system/button';
	import Field from '@rlanz/design-system/field';
	import FieldSelect from '@rlanz/design-system/field-select';
	import Panel from '@rlanz/design-system/panel';
	import { tagColors } from '@rlanz/design-system/tag-color';
	import { ref, watch } from 'vue';
	import { usePageTitle } from '~/composables/use_page_title';

	usePageTitle('Créer un tag');

	const name = ref('');
	const slug = ref('');
	const slugWasEdited = ref(false);
	const color = ref<string[]>(['cyan']);
	const colors = tagColors.map((tagColor) => ({
		label: tagColor,
		value: tagColor,
	}));

	watch(name, (value) => {
		if (!slugWasEdited.value) {
			slug.value = generateSlug(value);
		}
	});

	function handleSlugInput(value: string) {
		slugWasEdited.value = true;
		slug.value = value;
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
		<Form v-slot="{ errors }" route="admin.taxonomies.tags.store" class="flex flex-col gap-3">
			<Field v-model="name" name="name" label="Nom" type="text" :error-message="errors.name" />
			<Field
				:model-value="slug"
				name="slug"
				label="Slug"
				type="text"
				:error-message="errors.slug"
				@update:model-value="handleSlugInput"
			/>
			<input type="hidden" name="color" :value="color[0] ?? ''" />
			<FieldSelect
				v-model="color"
				label="Couleur"
				placeholder="Choisir une couleur"
				:items="colors"
				:error-message="errors.color"
			/>

			<div>
				<Button color="violet" type="submit">Créer</Button>
			</div>
		</Form>
	</Panel>
</template>
