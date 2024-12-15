<script lang="ts" setup>
	import { Head, useForm } from '@inertiajs/vue3';
	import AlertNote from '@rlanz/design-system/alert-note';
	import Button from '@rlanz/design-system/button';
	import ClientOnly from '@rlanz/design-system/client-only';
	import Field from '@rlanz/design-system/field';
	import { client } from '@rlanz/rpc/client';
	import { usePageProps } from '~/composables/use_page_props';

	const pageProps = usePageProps();

	const form = useForm({
		name: '',
		email: '',
		message: '',
	});

	function onSubmit() {
		const url = client.$url('pages.contact.store');

		form.post(url, {
			onSuccess: () => {
				form.reset();
			},
		});
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

			<AlertNote v-if="pageProps.success" class="mb-8" type="success">
				{{ pageProps.success }}
			</AlertNote>

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
