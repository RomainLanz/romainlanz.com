import string from '@adonisjs/core/helpers/string';
import app from '@adonisjs/core/services/app';
import emitter from '@adonisjs/core/services/emitter';
import logger from '@adonisjs/core/services/logger';

const blacklistedUrls = ['/node_modules', '/inertia', '/@', '/.adonisjs', '/__', '/installHook'];

emitter.on('http:request_completed', function ({ ctx, duration }) {
	if (blacklistedUrls.some((url) => ctx.request.url().startsWith(url))) {
		return;
	}

	if (!app.inDev) {
		return;
	}

	logger.info(
		`[HTTP] ${string.prettyHrTime(duration)} - ${ctx.response.getStatus()} - ${ctx.request.method()} ${ctx.request.url()}`
	);
});
