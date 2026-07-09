<script lang="ts" setup>
	import Footer from '@rlanz/design-system/footer';
	import TopBar from '@rlanz/design-system/top-bar';
	import { client } from '~/client';
	import LoginDialog from '~/components/auth/login_dialog.vue';
	import LoadFragment from '~/components/load_fragment.vue';
	import { useCurrentUser } from '~/composables/use_current_user';

	const currentUser = useCurrentUser();
	const aboutUrl = client.urlFor('pages.about');
	const adminUrl = client.urlFor('admin.pages.dashboard');
	const contactUrl = client.urlFor('pages.contact');
	const homeUrl = client.urlFor('pages.landing');
	const partnersUrl = client.urlFor('pages.partners');

	// const openNewsletterDialog = ref(false);
	// const form = useForm({
	// 	email: '',
	// });
	//
	// function onRegister() {
	// 	console.log(form);
	// }
</script>

<template>
	<TopBar :admin-href="adminUrl" :home-href="homeUrl" :user="currentUser">
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

	<Footer :about-href="aboutUrl" :contact-href="contactUrl" :home-href="homeUrl" :partners-href="partnersUrl">
		<!--		<template #newsletter> -->
		<!--			<NewsletterForm -->
		<!--				v-model:open="openNewsletterDialog" -->
		<!--				v-model:email="form.email" -->
		<!--				error-message="toto" -->
		<!--				@register="onRegister" -->
		<!--			/> -->
		<!--		</template> -->
	</Footer>
</template>
