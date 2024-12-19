import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

const kErrorBagHeader = 'X-Inertia-Error-Bag';

export default class ErrorBagMiddleware {
	handle(ctx: HttpContext, next: NextFn) {
		ctx.inertia.share({
			errors: ctx.inertia.always(() => this.#resolveValidationErrors(ctx)),
		});

		return next();
	}

	#resolveValidationErrors(ctx: HttpContext) {
		const { session, request } = ctx;

		if (session.flashMessages.has('errorsBag') && !session.flashMessages.has('errorsBag.E_VALIDATION_ERROR')) {
			return session.flashMessages.get('errorsBag');
		}

		if (!session.flashMessages.has('errorsBag.E_VALIDATION_ERROR')) {
			return null;
		}

		const errors = Object.entries(session.flashMessages.get('inputErrorsBag')).reduce(
			(errors, [field, messages]) => {
				errors[field] = Array.isArray(messages) ? messages[0] : messages;

				return errors;
			},
			{} as Record<string, string>
		);

		const errorBag = request.header(kErrorBagHeader);

		return errorBag ? { [errorBag]: errors } : errors;
	}
}
