<script lang="ts" setup>
	import Footer from '@rlanz/design-system/footer';
	import TopBar from '@rlanz/design-system/top-bar';
	import { client } from '~/client';
	import Sidebar from '~/components/admin/sidebar.vue';
	import { useCurrentUser } from '~/composables/use_current_user';
	import { usePageTitle } from '~/composables/use_page_title';

	const pageTitle = usePageTitle();
	const currentUser = useCurrentUser();
	const aboutUrl = client.urlFor('pages.about');
	const adminUrl = client.urlFor('admin.pages.dashboard');
	const contactUrl = client.urlFor('pages.contact');
	const homeUrl = client.urlFor('pages.landing');
</script>

<template>
	<div class="flex min-h-full grow bg-yellow-100">
		<Sidebar />

		<div class="flex w-0 flex-1 flex-col">
			<main class="relative z-0 grow px-8 focus:outline-none">
				<div class="space-y-8">
					<TopBar :admin-href="adminUrl" :home-href="homeUrl" :title="pageTitle" :user="currentUser" />

					<div class="mx-auto max-w-full pb-4">
						<slot />
					</div>
				</div>
			</main>

			<Footer :about-href="aboutUrl" :contact-href="contactUrl" :home-href="homeUrl" />
		</div>
	</div>
</template>

<style>
	main {
		scrollbar-gutter: stable both-edges;
	}
</style>
