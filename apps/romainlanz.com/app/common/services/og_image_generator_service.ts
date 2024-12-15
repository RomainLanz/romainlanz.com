import { readFile } from 'node:fs/promises';
import { assertExists } from '@adonisjs/core/helpers/assert';
import app from '@adonisjs/core/services/app';
import sharp, { type Sharp } from 'sharp';

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

		console.log(title);

		const [title1, title2] = title
			.trim()
			.split(/(.{0,20})(?:\s|$)/g)
			.filter(Boolean);

		const [subtitle1, subtitle2, subtitle3] = subtitle
			.trim()
			.split(/(.{0,60})(?:\s|$)/g)
			.filter(Boolean);

		const generatedSvg = OgImageGeneratorService.#template
			.replace('{{ title }}', title1)
			.replace('{{ title2 }}', title2 || '')
			.replace('{{ subtitle }}', subtitle1)
			.replace('{{ subtitle2 }}', subtitle2 || '')
			.replace('{{ subtitle3 }}', subtitle3 || '');

		return sharp(Buffer.from(generatedSvg))
			.resize(1200 * 1.1, 630 * 1.1)
			.png();
	}
}
