import { join } from 'path';
import { promises as fs } from 'fs';
import { compile } from 'mdsvex';

export function searchContentFiles() {
	return fs.readdir(join(process.cwd(), 'src/routes/blog'));
}

export async function loadContents() {
	const files = await searchContentFiles();

	const contents = [];

	for await (const file of files) {
		const content = await fs.readFile(join(process.cwd(), 'src/routes/blog', file));
		const compiledContent = await compile(content.toString());

		contents.push({
			path: file.split('.')[0],
			meta: compiledContent.data.fm
		});
	}

	return contents;
}
