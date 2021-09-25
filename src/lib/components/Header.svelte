<script lang="ts">
	import SiteTitle from '$lib/components/SiteTitle.svelte';
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';
</script>

<MaxWidthWrapper>
	<header>
		<SiteTitle />
	</header>
</MaxWidthWrapper>

<style>
	header {
		padding-block: var(--space-3);
	}
</style>
