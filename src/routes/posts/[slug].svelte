<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const response = await fetch(`/posts/${page.params.slug}.json`);

		if (response.ok) {
			const post = await response.json();

			return {
				props: { post }
			};
		}

		// TODO: Handle Error
	}
</script>

<script>
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';

	export let post = {};
</script>

<MaxWidthWrapper>
	<article class="generated-content">
		<h1>{post.data.fm.title}</h1>

		{@html post.code}
	</article>
</MaxWidthWrapper>

<style lang="scss">
	h1 {
		font-size: 3rem;
	}

	.generated-content {
		> :global(* + *) {
			margin-top: var(--space-3);
		}

		:global(h2) {
			border-top: 1px dashed var(--color-shaded-black);
			font-size: 2.5rem;
			margin-top: var(--space-6);
			padding-top: var(--space-6);
		}

		:global(p) {
			font-size: 1.2rem;
			font-weight: var(--font-weight-medium);
		}

		:global(img) {
			display: block;
			width: 100%;
		}

		:global(p code) {
			font-size: 1.1rem;
			color: var(--color-blue);

			&::after,
			&::before {
				content: '\`';
			}
		}

		:global(pre) {
			border-radius: var(--border-radius);
		}

		:global(a) {
			color: var(--color-pink);
			font-weight: var(--font-weight-medium);
			text-decoration: none;

			&:hover {
				text-decoration: revert;
			}
		}

		:global(ul) {
			list-style: none;
		}

		:global(* + ul) {
			margin-top: 0;
		}

		:global(li) {
			font-size: 1.2rem;
			font-weight: var(--font-weight-medium);
			margin-left: var(--space-3);

			&::before {
				content: '—';
				margin-right: var(--space-2);
				opacity: 0.5;
			}
		}
	}
</style>
