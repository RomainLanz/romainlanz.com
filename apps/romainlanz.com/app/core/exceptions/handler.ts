import { ExceptionHandler } from '@adonisjs/core/http';
import app from '@adonisjs/core/services/app';
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http';

export default class HttpExceptionHandler extends ExceptionHandler {
	/**
	 * In debug mode, the exception handler will display verbose errors
	 * with pretty printed stack traces.
	 */
	protected debug = !app.inProduction;

	/**
	 * Status pages are used to display a custom HTML pages for certain error
	 * codes. You might want to enable them in production only, but feel
	 * free to enable them in development as well.
	 */
	protected renderStatusPages = app.inProduction;

	/**
	 * Status pages is a collection of error code range and a callback
	 * to return the HTML contents to send as a response.
	 */
	protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
		'401': (_error, { inertia }) => inertia.render('errors/unauthorized', {}),
		'403': (_error, { inertia }) => inertia.render('errors/forbidden', {}),
		'404': (_error, { inertia }) => inertia.render('errors/not_found', {}),
		'500..599': (error, { inertia }) => inertia.render('errors/server_error', { errorCode: error.status ?? 500 }),
	};
}
