import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

const {
	admin: {
		pages: { Pages: PagesController },
	},
} = controllers;

router
	.group(() => {
		router.get('dashboard', [PagesController, 'dashboard']).as('pages.dashboard');
	})
	.prefix('admin')
	.as('admin')
	.middleware([middleware.auth()]);
