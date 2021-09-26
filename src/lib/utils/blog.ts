import { join } from 'path';
import { promises as fs } from 'fs';
import { compile } from 'mdsvex';

export function searchContentFiles() {
	return fs.readdir(join(process.cwd(), 'src/content'));
}

export async function loadContents() {
	const files = await searchContentFiles();

	const compilations = files.map(async (file) => {
		const content = await fs.readFile(join(process.cwd(), 'src/content', file));
		return compile(content.toString());
	});

	return Promise.all(compilations);
}

export async function loadContent(fileName: string) {
	const files = await searchContentFiles();

	// TODO: Handle 404
	const [file] = files.filter((file) => file === `${fileName}.md`);

	const content = await fs.readFile(join(process.cwd(), 'src/content', file));
	return compile(content.toString());
}
