import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import env from '#start/env';

const {
	redirects: { ProcessRedirect: ProcessRedirectController },
} = controllers;

router.get('*', [ProcessRedirectController, 'execute']).domain(env.get('REDIRECT_DOMAIN'));
