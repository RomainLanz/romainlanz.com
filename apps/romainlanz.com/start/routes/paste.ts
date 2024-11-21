import router from '@adonisjs/core/services/router';

// region Controller's Imports
const ShowPasteController = () => import('#paste/controllers/show_paste_controller');
const StorePasteController = () => import('#paste/controllers/store_paste_controller');
// endregion

router
	.group(() => {
		router.get('/', [StorePasteController, 'render']).as('pastes.create');
		router.post('/', [StorePasteController, 'execute']).as('pastes.store');
		router.get(':id', [ShowPasteController, 'render']).as('pastes.show');
	})
	.domain('paste.romainlanz.localhost');
