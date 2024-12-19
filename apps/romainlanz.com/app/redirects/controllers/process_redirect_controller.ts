import { inject } from '@adonisjs/core';
import { assertExists } from '@adonisjs/core/helpers/assert';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import { defer } from '#core/services/defer';
import { Visit } from '#redirects/domain/visit';
import { VisitIdentifier } from '#redirects/domain/visit_identifier';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import { VisitRepository } from '#redirects/repositories/visit_repository';
import { ComputeVisitHashService } from '#redirects/services/compute_visit_hash_service';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ProcessRedirectController {
	constructor(
		private readonly redirectRepository: RedirectRepository,
		private readonly visitRepository: VisitRepository,
		private readonly timeService: TimeServiceContract,
		private readonly computeVisitHashService: ComputeVisitHashService
	) {}

	async execute({ params, request, response }: HttpContext) {
		const redirect = await this.redirectRepository.findBySlug(params['*']);

		defer.push(async () => {
			const clientIp = request.header('CF-Connecting-IP', request.ip());

			assertExists(clientIp, 'Client IP is missing');

			const uniqueHash = await this.computeVisitHashService.execute({
				ipAddressRaw: clientIp,
				userAgent: request.header('user-agent') ?? '',
			});

			const visit = Visit.create({
				id: VisitIdentifier.generate(),
				createdAt: this.timeService.now(),
				referer: request.header('referer') ?? '',
				redirectId: redirect.getIdentifier(),
				uniqueHash,
			});

			await this.visitRepository.save(visit);
		});

		return response.redirect(redirect.props.destination);
	}
}
