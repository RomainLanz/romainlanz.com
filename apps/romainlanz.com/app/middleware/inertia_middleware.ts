import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware';
import { CurrentUserViewModel } from '#auth/view_models/current_user_view_model';
import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import type { InferSharedProps } from '@adonisjs/inertia/types';

export default class InertiaMiddleware extends BaseInertiaMiddleware {
	share(ctx: HttpContext) {
		return {
			errors: ctx.inertia.always(this.getValidationErrors(ctx)),
			currentUser: ctx.inertia.always(CurrentUserViewModel.fromDomain(ctx.auth.user).serialize()),
			success: ctx.inertia.always(ctx.session?.flashMessages.get('success')),
		};
	}

	async handle(ctx: HttpContext, next: NextFn) {
		await this.init(ctx);
		const output = await next();
		this.dispose(ctx);
		return output;
	}
}

declare module '@adonisjs/inertia/types' {
	export interface SharedProps extends InferSharedProps<InertiaMiddleware> {}
}
