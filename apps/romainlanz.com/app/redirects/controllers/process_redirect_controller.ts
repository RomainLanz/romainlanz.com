import { inject } from '@adonisjs/core';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import { defer } from '#core/services/defer';
import { Visit } from '#redirects/domain/visit';
import { VisitIdentifier } from '#redirects/domain/visit_identifier';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import { VisitRepository } from '#redirects/repositories/visit_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ProcessRedirectController {
	constructor(
		private readonly redirectRepository: RedirectRepository,
		private readonly visitRepository: VisitRepository,
		private readonly timeService: TimeServiceContract
	) {}

	async execute({ params, request, response }: HttpContext) {
		const redirect = await this.redirectRepository.findByUrl(params['*']);

		defer.push(async () => {
			const visit = Visit.create({
				id: VisitIdentifier.generate(),
				createdAt: this.timeService.now(),
				ipAddressRaw: request.ip(),
				referer: request.header('referer') ?? '',
				redirectId: redirect.getIdentifier(),
			});

			await this.visitRepository.save(visit);
		});

		return response.redirect(redirect.props.destination);
	}
}
