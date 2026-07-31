import { readFile } from 'node:fs/promises';
import { assertExists } from '@adonisjs/core/helpers/assert';
import app from '@adonisjs/core/services/app';
import sharp, { type Sharp } from 'sharp';

interface WrapTextOptions {
	maxChars: number;
	maxLines: number;
}

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function truncateLine(line: string, maxChars: number) {
	if (line.length <= maxChars) {
		return line;
	}

	return `${line.slice(0, maxChars - 1).trimEnd()}…`;
}

function wrapText(text: string, { maxChars, maxLines }: WrapTextOptions) {
	const words = text.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean);
	const lines: string[] = [];

	for (const word of words) {
		const currentLine = lines.at(-1);

		if (!currentLine) {
			lines.push(truncateLine(word, maxChars));
			continue;
		}

		const candidate = `${currentLine} ${word}`;

		if (candidate.length <= maxChars) {
			lines[lines.length - 1] = candidate;
			continue;
		}

		if (lines.length === maxLines) {
			lines[lines.length - 1] = truncateLine(`${currentLine} ${word}`, maxChars);
			break;
		}

		lines.push(truncateLine(word, maxChars));
	}

	return Array.from({ length: maxLines }, (_, index) => escapeXml(lines[index] ?? ''));
}

export class OgImageGeneratorService {
	static #template: string | null = null;

	async #loadTemplate() {
		OgImageGeneratorService.#template = await readFile(app.makePath('resources/og_template.svg'), 'utf-8');
	}

	async generate(title: string, subtitle: string): Promise<Sharp> {
		if (!OgImageGeneratorService.#template) {
			await this.#loadTemplate();
		}

		assertExists(OgImageGeneratorService.#template, 'Template should be loaded');

		const [title1, title2] = wrapText(title, { maxChars: 24, maxLines: 2 });
		const [subtitle1, subtitle2, subtitle3] = wrapText(subtitle, { maxChars: 58, maxLines: 3 });

		const generatedSvg = OgImageGeneratorService.#template
			.replace('{{ title }}', title1)
			.replace('{{ title2 }}', title2)
			.replace('{{ subtitle }}', subtitle1)
			.replace('{{ subtitle2 }}', subtitle2)
			.replace('{{ subtitle3 }}', subtitle3);

		return sharp(Buffer.from(generatedSvg)).resize(1200, 630).png();
	}
}
