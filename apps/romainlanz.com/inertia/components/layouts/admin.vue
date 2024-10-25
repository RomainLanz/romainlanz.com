<script lang="ts" setup>
	import Footer from '@rlanz/design-system/footer';
	import TopBar from '@rlanz/design-system/top-bar';
	import Sidebar from '~/components/admin/sidebar.vue';
	import { useCurrentUser } from '~/composables/use_current_user';

	const currentUser = useCurrentUser();
</script>

<template>
	<TopBar :user="currentUser" :is-live="false" />

	<main class="m-auto max-w-6xl px-4">
		<div class="flex gap-4">
			<Sidebar />

			<slot />
		</div>
	</main>

	<Footer />
</template>
