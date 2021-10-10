<script lang="ts">
	import SiteTitle from '$lib/components/SiteTitle.svelte';
	import ThemeSelector from '$lib/components/ThemeSelector.svelte';
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';
</script>

<MaxWidthWrapper>
	<header>
		<SiteTitle />
		<ThemeSelector />
	</header>
</MaxWidthWrapper>

<style>
	header {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding-block: var(--space-3);
	}
</style>
