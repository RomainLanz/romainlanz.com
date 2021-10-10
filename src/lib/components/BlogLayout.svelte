<script lang="ts">
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';

	export let title;
</script>

<svelte:head>
	<title>{title} | Romain Lanz</title>
</svelte:head>

<MaxWidthWrapper>
	<article class="generated-content">
		<h1>{title}</h1>

		<slot />
	</article>
</MaxWidthWrapper>

<style>
	h1 {
		font-size: 3rem;
	}
</style>
