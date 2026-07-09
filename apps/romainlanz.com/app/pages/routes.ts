import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';

const {
	pages: {
		About: AboutController,
		Contact: ContactController,
		Landing: LandingController,
		Partners: PartnersController,
	},
} = controllers;

router.get('/', [LandingController, 'render']).as('pages.landing');
router.get('contact', [ContactController, 'render']).as('pages.contact');
router.post('contact', [ContactController, 'execute']).as('pages.contact.store');
router.get('a-propos', [AboutController, 'render']).as('pages.about');
router.get('partenaires', [PartnersController, 'render']).as('pages.partners');
