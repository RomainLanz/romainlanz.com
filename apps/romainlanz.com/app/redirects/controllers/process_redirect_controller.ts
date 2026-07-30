import { inject } from '@adonisjs/core';
import { assertExists } from '@adonisjs/core/helpers/assert';
import { defer } from '#core/services/defer';
import { TrackRedirectVisit } from '#redirects/actions/track_redirect_visit';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ProcessRedirectController {
	constructor(
		private readonly redirectRepository: RedirectRepository,
		private readonly trackRedirectVisit: TrackRedirectVisit,
	) {}

	async execute({ params, request, response }: HttpContext) {
		const redirect = await this.redirectRepository.findBySlug(params['*']);

		defer.push(async () => {
			const clientIp = request.header('CF-Connecting-IP', request.ip());

			assertExists(clientIp, 'Client IP is missing');

			await this.trackRedirectVisit.execute({
				ipAddressRaw: clientIp,
				userAgent: request.header('user-agent') ?? '',
				referer: request.header('referer') ?? '',
				redirectId: redirect.getIdentifier(),
			});
		});

		return response.redirect(redirect.props.destination);
	}
}
