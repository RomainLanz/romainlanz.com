<script lang="ts" setup>
	import Footer from '@rlanz/design-system/footer';
	import TopBar from '@rlanz/design-system/top-bar';
	import LoginDialog from '~/components/auth/login_dialog.vue';
</script>

<template>
	<TopBar :is-live="false">
		<template #not-connected>
			<LoginDialog />
		</template>
	</TopBar>

	<main>
		<slot />
	</main>

	<Footer />
</template>
