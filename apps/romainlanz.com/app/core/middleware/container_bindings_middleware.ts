import { HttpContext } from '@adonisjs/core/http';
import { Logger } from '@adonisjs/core/logger';
import { DateTime } from 'luxon';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import { TimeFreezeService } from '#shared/services/time_freeze_service';
import type { NextFn } from '@adonisjs/core/types/http';

/**
 * The container bindings middleware binds classes to their request
 * specific value using the container resolver.
 *
 * - We bind "HttpContext" class to the "ctx" object
 * - And bind "Logger" class to the "ctx.logger" object
 */
export default class ContainerBindingsMiddleware {
	handle(ctx: HttpContext, next: NextFn) {
		const timeFreezeService = new TimeFreezeService(DateTime.now());

		ctx.containerResolver.bindValue(HttpContext, ctx);
		ctx.containerResolver.bindValue(Logger, ctx.logger);
		ctx.containerResolver.bindValue(TimeServiceContract, timeFreezeService);

		return next();
	}
}
