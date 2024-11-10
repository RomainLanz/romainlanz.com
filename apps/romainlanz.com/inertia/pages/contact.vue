<script lang="ts" setup>
	import { Head, useForm } from '@inertiajs/vue3';
	import Button from '@rlanz/design-system/button';
	import ClientOnly from '@rlanz/design-system/client-only';
	import Field from '@rlanz/design-system/field';

	const form = useForm({
		name: '',
		email: '',
		message: '',
	});

	function onSubmit() {
		form.post('');
	}
</script>

<template>
	<Head title="Contact" />

	<section class="mx-auto mt-24 max-w-[80ch] px-4">
		<h1 class="mb-8">Contact</h1>

		<div class="mx-auto max-w-[80ch]">
			<p class="mb-8 text-lg">
				Vous avez une question, une suggestion, ou simplement envie de discuter de développement ? N’hésitez pas à me
				contacter ! Que ce soit pour des retours sur le site, des demandes de collaboration ou tout autre sujet, je
				serai ravi de vous répondre dans les plus brefs délais.
			</p>

			<ClientOnly>
				<form class="flex flex-col gap-4" @submit.prevent="onSubmit">
					<Field v-model="form.name" label="Nom" />
					<Field v-model="form.email" label="Email" type="email" />
					<Field v-model="form.message" label="Message" type="textarea" :rows="10" />

					<Button color="yellow" type="submit">Envoyer</Button>
				</form>

				<template #placeholder>
					<!-- This is temporary used to avoid having a display without inputs -->
				</template>
			</ClientOnly>
		</div>
	</section>
</template>
