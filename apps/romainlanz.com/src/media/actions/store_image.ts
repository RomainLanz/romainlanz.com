import { randomUUID } from 'node:crypto';
import app from '@adonisjs/core/services/app';
import type { MultipartFile } from '@adonisjs/core/bodyparser';

export class StoreImage {
	async execute(image: MultipartFile) {
		const fileName = `${randomUUID()}.${image.extname}`;

		await image.move(app.makePath('public/uploads'), {
			name: fileName,
		});

		return `uploads/${fileName}`;
	}
}
