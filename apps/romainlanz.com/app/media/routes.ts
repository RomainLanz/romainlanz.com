import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

const {
	media: { UploadImage: UploadImageController },
} = controllers;

router
	.group(() => {
		router.post('assets/images', [UploadImageController]).as('assets.store');
	})
	.prefix('api')
	.as('api')
	.middleware([middleware.auth()]);
