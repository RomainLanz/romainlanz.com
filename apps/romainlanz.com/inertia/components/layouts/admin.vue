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
	<div class="min-h-full flex flex-grow-1 bg-yellow-100">
		<Sidebar />

		<div class="w-0 flex flex-1 flex-col">
			<main class="relative z-0 flex-grow-1 px-8 focus:outline-none">
				<div class="space-y-8">
					<TopBar :title="pageTitle" :user="currentUser" />

					<div class="mx-auto max-w-full pb-4">
						<slot />
					</div>
				</div>
			</main>

			<Footer />
		</div>
	</div>
</template>

<style>
	main {
		scrollbar-gutter: stable both-edges;
	}
</style>
