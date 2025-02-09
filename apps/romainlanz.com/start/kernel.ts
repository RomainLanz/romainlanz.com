/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from '@adonisjs/core/services/router';
import server from '@adonisjs/core/services/server';
import { Settings } from 'luxon';

Settings.defaultLocale = 'fr';

/**
 * The error handler is used to convert an exception
 * to HTTP response.
 */
server.errorHandler(() => import('#core/exceptions/handler'));

/**
 * The server middleware stack runs middleware on all the HTTP
 * requests, even if there is no route registered for
 * the request URL.
 */
server.use([
	() => import('#core/middleware/container_bindings_middleware'),
	() => import('@adonisjs/static/static_middleware'),
	() => import('@adonisjs/vite/vite_middleware'),
	() => import('@adonisjs/session/session_middleware'),
	() => import('@adonisjs/auth/initialize_auth_middleware'),
	() => import('#auth/middleware/silent_auth_middleware'),
	() => import('@adonisjs/inertia/inertia_middleware'),
]);

/**
 * The router middleware stack runs middleware on all the HTTP
 * requests with a registered route.
 */
router.use([
	() => import('@adonisjs/core/bodyparser_middleware'),
	() => import('@adonisjs/shield/shield_middleware'),
	() => import('#core/middleware/detect_user_locale_middleware'),
	() => import('#core/middleware/initialize_bouncer_middleware'),
]);

/**
 * Named middleware collection must be explicitly assigned to
 * the routes or the routes group.
 */
export const middleware = router.named({
	auth: () => import('#auth/middleware/auth_middleware'),
	guest: () => import('#auth/middleware/guest_middleware'),
});
