import { loadContent } from '$lib/utils/blog';

export async function get({ params }) {
	const content = await loadContent(params.slug);

	return { body: JSON.stringify(content) };
}
