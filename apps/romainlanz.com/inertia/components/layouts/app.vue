<script lang="ts" setup>
	import { useForm } from '@inertiajs/vue3';
	import Footer from '@rlanz/design-system/footer';
	import NewsletterForm from '@rlanz/design-system/newsletter-form';
	import TopBar from '@rlanz/design-system/top-bar';
	import { ref } from 'vue';
	import LoginDialog from '~/components/auth/login_dialog.vue';
	import LoadFragment from '~/components/load_fragment.vue';
	import { useCurrentUser } from '~/composables/use_current_user';

	const currentUser = useCurrentUser();

	const openNewsletterDialog = ref(false);
	const form = useForm({
		email: '',
	});

	function onRegister() {
		console.log(form);
	}
</script>

<template>
	<TopBar :user="currentUser">
		<template #after-logo>
			<LoadFragment source="/live/status" />
		</template>

		<template #not-connected>
			<LoginDialog />
		</template>
	</TopBar>

	<main class="grow">
		<slot />
	</main>

	<Footer>
		<template #newsletter>
			<NewsletterForm
				v-model:open="openNewsletterDialog"
				v-model:email="form.email"
				error-message="toto"
				@register="onRegister"
			/>
		</template>
	</Footer>
</template>
