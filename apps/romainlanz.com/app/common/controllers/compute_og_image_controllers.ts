import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { OgImageGeneratorService } from '#common/services/og_image_generator_service';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ComputeOgImageControllers {
	static validator = vine.compile(
		vine.object({
			title: vine.string().trim(),
			subtitle: vine.string().trim(),
		})
	);

	constructor(private readonly ogImageGeneratorService: OgImageGeneratorService) {}

	async execute({ request, response }: HttpContext) {
		const { title, subtitle } = await request.validateUsing(ComputeOgImageControllers.validator);

		const image = await this.ogImageGeneratorService.generate(title, subtitle);

		return response.header('Content-Type', 'image/png').stream(image);
	}
}
