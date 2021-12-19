<script lant="ts">
	import SunIcon from '$lib/components/SunIcon.svelte';
	import MoonIcon from '$lib/components/MoonIcon.svelte';
	import { onMount } from 'svelte';

	let theme = 'light';

	onMount(() => {
		if (localStorage.getItem('preferred-theme')) {
			theme = localStorage.getItem('preferred-theme')
		} else {
			theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}

		if (theme === 'dark') {
			document.body.classList.add('dark');
		}
	});

	function swapTheme() {
		theme = theme === 'light' ? 'dark' : 'light';

		localStorage.setItem('preferred-theme', theme)

		if (theme === 'dark') {
			document.body.classList.add('dark');
			return;
		}

		document.body.classList.remove('dark');
	}
</script>

<button on:click={swapTheme}>
	{#if theme === 'light'}
		<MoonIcon />
	{:else}
		<SunIcon />
	{/if}
</button>

<style lang="scss">
	:global(body.dark) {
		--color-black: hsl(0deg, 100%, 100%);
		--bg-color-body: hsl(210deg, 5%, 10%);
	}

	button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: var(--color-black);
		height: 2rem;
		width: 2rem;
	}
</style>
