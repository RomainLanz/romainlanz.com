<script lang="ts" setup>
	import Footer from '@rlanz/design-system/footer';
	import TopBar from '@rlanz/design-system/top-bar';
	import LoginDialog from '~/components/auth/login_dialog.vue';
	import LoadFragment from '~/components/load_fragment.vue';
	import { useCurrentUser } from '~/composables/use_current_user';

	const currentUser = useCurrentUser();
</script>

<template>
	<TopBar :user="currentUser" :is-live="false">
		<template #after-logo>
			<LoadFragment source="/live/status" />
		</template>

		<template #not-connected>
			<LoginDialog />
		</template>
	</TopBar>

	<main>
		<slot />
	</main>

	<Footer />
</template>
