<script lang="ts" setup>
	import Footer from '@rlanz/design-system/footer';
	import TopBar from '@rlanz/design-system/top-bar';
</script>

<template>
	<TopBar :is-live="false" />

	<main>
		<slot />
	</main>

	<Footer />
</template>
