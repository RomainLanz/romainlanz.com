import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';

const {
	paste: { ShowPaste: ShowPasteController, StorePaste: StorePasteController },
} = controllers;

router
	.group(() => {
		router.get('/', [StorePasteController, 'render']).as('pastes.create');
		router.post('/', [StorePasteController, 'execute']).as('pastes.store');
		router.get(':id', [ShowPasteController, 'render']).as('pastes.show');
	})
	.domain('paste.romainlanz.localhost');
