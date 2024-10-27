<script lang="ts" setup>
	import Footer from '@rlanz/design-system/footer';
	import TopBar from '@rlanz/design-system/top-bar';
	import Sidebar from '~/components/admin/sidebar.vue';
	import { useCurrentUser } from '~/composables/use_current_user';
	import { usePageTitle } from '~/composables/use_page_title';

	const pageTitle = usePageTitle();
	const currentUser = useCurrentUser();
</script>

<template>
	<TopBar :user="currentUser" :is-live="false" />

	<main class="m-auto max-w-7xl px-4">
		<h1 class="my-8 text-5xl text-gray-800">{{ pageTitle }}</h1>

		<div class="flex gap-4">
			<Sidebar />

			<div class="grow">
				<slot />
			</div>
		</div>
	</main>

	<Footer />
</template>
