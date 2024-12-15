<script lang="ts" setup>
	import { useForm } from '@inertiajs/vue3';
	import Button from '@rlanz/design-system/button';
	import Field from '@rlanz/design-system/field';
	import Panel from '@rlanz/design-system/panel';
	import { client } from '@rlanz/rpc/client';
	import { usePageTitle } from '~/composables/use_page_title';

	usePageTitle('Créer une catégorie');

	const form = useForm({
		name: '',
		slug: '',
	});

	function handleSubmit() {
		const url = client.$url('admin.taxonomies.categories.store');

		form.post(url, {});
	}
</script>

<template>
	<Panel>
		<form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
			<Field v-model="form.name" label="Nom" type="text" :error-message="form.errors.name?.[0]" />
			<Field v-model="form.slug" label="Slug" type="text" :error-message="form.errors.slug?.[0]" />

			<div>
				<Button color="violet" type="submit">Créer</Button>
			</div>
		</form>
	</Panel>
</template>
