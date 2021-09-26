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
	export let post = {};
</script>

<h1>{post.data.fm.title}</h1>

{@html post.code}
