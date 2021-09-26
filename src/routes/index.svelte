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

<script>
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';

	export let posts = [];
</script>

<MaxWidthWrapper>
	<h1>Posts</h1>

	{#each posts as post}
		<article>
			<header>
				<time datetime={post.data.fm.date}>{post.data.fm.date}</time>
				<h2>{post.data.fm.title}</h2>
				{#each post.data.fm.tags.split(' ') as tag}
					<span>{tag}</span>
				{/each}
			</header>

			<p>{post.data.fm.excerpt}</p>

			<footer>
				<a href="/posts/{post.data.fm.slug}" aria-label="Read more about {post.data.fm.title}">
					Read More
				</a>
			</footer>
		</article>
	{/each}
</MaxWidthWrapper>

<style lang="scss">
	a {
		color: var(--color-blue);
		text-decoration: none;

		&:hover,
		&:focus {
			text-decoration: revert;
		}
	}

	time {
		color: var(--color-shaded-black);
		font-weight: var(--font-weight-bold);
	}

	h2 {
		font-size: 2.5rem;
		text-transform: capitalize;
	}

	article {
		margin-bottom: var(--space-8);
	}

	p {
		font-size: 1.3rem;
	}

	span {
		background-color: var(--color-blue);
		color: var(--color-white);
		border-radius: var(--border-radius);
		padding-inline: var(--space-2);
		margin-right: var(--space-2);
	}
</style>
