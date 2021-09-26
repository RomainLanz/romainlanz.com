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
	export let posts = [];
</script>

<ul>
	{#each posts as post}
		<li>
			<a href="/posts/{post.data.fm.slug}">{post.data.fm.title}</a>
		</li>
	{/each}
</ul>
