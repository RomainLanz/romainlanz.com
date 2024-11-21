<script lang="ts" setup>
	import { useForm } from '@inertiajs/vue3';

	defineProps<{
		bundledLanguages: any;
	}>();

	const form = useForm({ lang: '', content: '' });

	function handleSubmit() {
		form.post('/');
	}
</script>

<template>
	<div>
		<h1>Create a new paste</h1>

		<form @submit.prevent="handleSubmit">
			<select v-model="form.lang">
				<option v-for="lang in bundledLanguages" :key="lang.id" :value="lang.id">{{ lang.name }}</option>
			</select>

			<textarea v-model="form.content"></textarea>
			<button type="submit">Save</button>
		</form>
	</div>
</template>
