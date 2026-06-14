import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

const {
	admin: {
		redirects: {
			DeleteRedirect: DeleteRedirectController,
			ListRedirects: ListRedirectsController,
			StoreRedirect: StoreRedirectController,
		},
	},
} = controllers;

router
	.group(() => {
		router.get('redirects', [ListRedirectsController, 'render']).as('redirects.index');
		router.get('redirects/create', [StoreRedirectController, 'render']).as('redirects.create');
		router.post('redirects', [StoreRedirectController, 'execute']).as('redirects.store');
		router.delete('redirects/:id', [DeleteRedirectController, 'execute']).as('redirects.delete');
	})
	.prefix('admin')
	.as('admin')
	.middleware([middleware.auth()]);
