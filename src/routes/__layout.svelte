<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<style>
	main {
		margin-top: var(--space-7);
	}
</style>
