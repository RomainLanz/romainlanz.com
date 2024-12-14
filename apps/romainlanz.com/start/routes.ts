import './routes/admin.js';
import './routes/app.js';
import './routes/fragments.js';
import './routes/paste.js';
import './routes/redirect.js';
import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

// region Controller's Imports
const UploadImageController = () => import('#media/controllers/upload_image_controller');
// endregion

router
	.group(() => {
		router.post('assets/images', [UploadImageController]).as('assets.store');
	})
	.prefix('api')
	.as('api')
	.middleware([middleware.auth()]);
