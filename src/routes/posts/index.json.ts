import { loadContents } from '$lib/utils/blog';

export async function get() {
	const contents = await loadContents();

	return { body: JSON.stringify(contents) };
}
