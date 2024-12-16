<script lang="ts" setup>
	import Button from '@rlanz/design-system/button';
	import Checkbox from '@rlanz/design-system/checkbox';
	import Field from '@rlanz/design-system/field';

	defineProps<{
		loading?: boolean;
	}>();

	const emits = defineEmits<{
		submit: [];
	}>();

	const email = defineModel<string>('email');
	const password = defineModel<string>('password');
	const remember = defineModel<boolean>('remember');

	function onSubmit() {
		emits('submit');
	}
</script>

<template>
	<form class="flex flex-col gap-4" @submit.prevent="onSubmit">
		<Field v-model="email" label="Email" type="email" />

		<Field v-model="password" label="Password" type="password" />

		<Checkbox v-model="remember" label="Se souvenir de moi" />

		<Button color="yellow">Se connecter</Button>
	</form>
</template>
