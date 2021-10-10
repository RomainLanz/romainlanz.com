<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const response = await fetch('/posts.json');

		if (response.ok) {
			const posts = await response.json();

			return {
				props: { posts }
			};
		}

		// TODO: Handle Error
	}
</script>

<script lang="ts">
	import { parseISO, format } from 'date-fns';
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';

	export let posts = [];

	function formatDate(date: string): string {
		return format(parseISO(date), 'dd.MM.yyyy');
	}
</script>

<svelte:head>
	<title>All my posts | Romain Lanz</title>
</svelte:head>

<MaxWidthWrapper>
	{#each posts as post}
		<article>
			<header>
				<h1>{post.meta.title}</h1>
				<div>
					<time datetime={post.meta.date}>{formatDate(post.meta.date)}</time>
					&mdash;
					{#each post.meta.tags.split(' ') as tag}
						<span>{tag}</span>
					{/each}
				</div>
			</header>

			<p>{post.meta.excerpt}</p>

			<footer>
				<a href="/blog/{post.path}" aria-label="Read more about {post.meta.title}"> Read More </a>
			</footer>
		</article>
	{/each}
</MaxWidthWrapper>

<style lang="scss">
	a {
		color: var(--color-pink);
		font-weight: var(--font-weight-bold);
		text-decoration: none;

		&:hover,
		&:focus {
			text-decoration: revert;
		}
	}

	time {
		font-weight: var(--font-weight-bold);
	}

	h1 {
		line-height: 1.2;
		font-size: 3rem;
		text-transform: capitalize;
	}

	article {
		margin-bottom: var(--space-8);
		padding-block: var(--space-4);
		border-bottom: 1px dashed var(--color-shaded-black);
	}

	header {
		margin-bottom: var(--space-4);
	}

	footer {
		margin-top: var(--space-4);
		text-align: right;
	}

	p {
		font-size: 1.3rem;
		text-align: justify;
	}

	span {
		color: var(--color-blue);
		font-weight: var(--font-weight-bold);
		margin-right: var(--space-2);

		&::before {
			content: '#';
		}
	}
</style>
