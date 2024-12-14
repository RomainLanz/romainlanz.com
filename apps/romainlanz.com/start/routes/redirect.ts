import router from '@adonisjs/core/services/router';
import env from '#start/env';

// region Controller's Imports
const ProcessRedirectController = () => import('#redirects/controllers/process_redirect_controller');
// endregion

router.get('*', [ProcessRedirectController, 'execute']).domain(env.get('REDIRECT_DOMAIN'));
