import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { ArticlePolicy } from '#admin/articles/policies/article_policy';
import { OgImageGeneratorService } from '#common/services/og_image_generator_service';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class PreviewOgImageController {
	static validator = vine.compile(
		vine.object({
			title: vine.string().trim(),
			subtitle: vine.string().trim(),
		}),
	);

	constructor(private readonly ogImageGeneratorService: OgImageGeneratorService) {}

	async execute({ bouncer, request, response }: HttpContext) {
		await bouncer.with(ArticlePolicy).allows('update');
		const { title, subtitle } = await request.validateUsing(PreviewOgImageController.validator);

		const image = await this.ogImageGeneratorService.generate(title, subtitle);

		return response.header('Content-Type', 'image/png').header('Cache-Control', 'no-store').stream(image);
	}
}
