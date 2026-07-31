import { inject } from '@adonisjs/core';
import { StoreImage } from '#media/actions/store_image';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class UploadImageController {
	constructor(private storeImage: StoreImage) {}

	async handle({ auth, request, response }: HttpContext) {
		const user = auth.getUserOrFail();

		if (!user.isAdmin()) {
			return response.forbidden();
		}

		// TODO: Refactor once AdonisJS Drive is migrated
		const image = request.file('image', {
			size: '2mb',
			extnames: ['jpg', 'png', 'gif', 'jpeg'],
		});

		if (!image) {
			return response.badRequest({ errors: [{ message: 'Image is required' }] });
		}

		if (!image.isValid) {
			return response.badRequest({ errors: image.errors });
		}

		const filePath = await this.storeImage.execute(image);

		return response.ok({ data: { filePath } });
	}
}
