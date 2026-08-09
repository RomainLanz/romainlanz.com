import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

router
	.group(() => {
		router.get('taxonomies', [controllers.admin.taxonomies.ListTaxonomies, 'render']).as('taxonomies.index');
		router
			.get('taxonomies/categories/create', [controllers.admin.taxonomies.StoreCategory, 'render'])
			.as('taxonomies.categories.create');
		router
			.post('taxonomies/categories', [controllers.admin.taxonomies.StoreCategory, 'execute'])
			.as('taxonomies.categories.store');
		router
			.get('taxonomies/tags/create', [controllers.admin.taxonomies.StoreTag, 'render'])
			.as('taxonomies.tags.create');
		router.post('taxonomies/tags', [controllers.admin.taxonomies.StoreTag, 'execute']).as('taxonomies.tags.store');
		router
			.get('taxonomies/tags/:id/edit', [controllers.admin.taxonomies.UpdateTag, 'render'])
			.as('taxonomies.tags.edit');
		router.put('taxonomies/tags/:id', [controllers.admin.taxonomies.UpdateTag, 'execute']).as('taxonomies.tags.update');
	})
	.prefix('admin')
	.as('admin')
	.middleware([middleware.auth()]);
