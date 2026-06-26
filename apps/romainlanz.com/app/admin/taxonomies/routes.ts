import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

const {
	admin: {
		taxonomies: {
			ListTaxonomies: ListTaxonomiesController,
			StoreCategory: StoreCategoryController,
			StoreTag: StoreTagController,
		},
	},
} = controllers;

router
	.group(() => {
		router.get('taxonomies', [ListTaxonomiesController, 'render']).as('taxonomies.index');
		router.get('taxonomies/categories/create', [StoreCategoryController, 'render']).as('taxonomies.categories.create');
		router.post('taxonomies/categories', [StoreCategoryController, 'execute']).as('taxonomies.categories.store');
		router.get('taxonomies/tags/create', [StoreTagController, 'render']).as('taxonomies.tags.create');
		router.post('taxonomies/tags', [StoreTagController, 'execute']).as('taxonomies.tags.store');
	})
	.prefix('admin')
	.as('admin')
	.middleware([middleware.auth()]);
