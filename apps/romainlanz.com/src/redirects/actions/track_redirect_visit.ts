import { inject } from '@adonisjs/core';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import { Visit } from '#redirects/domain/visit';
import { VisitIdentifier } from '#redirects/domain/visit_identifier';
import { VisitRepository } from '#redirects/repositories/visit_repository';
import { ComputeVisitHashService } from '#redirects/services/compute_visit_hash_service';
import type { RedirectIdentifier } from '#redirects/domain/redirect_identifier';

interface TrackRedirectVisitInput {
	ipAddressRaw: string;
	userAgent: string;
	referer: string;
	redirectId: RedirectIdentifier;
}

@inject()
export class TrackRedirectVisit {
	constructor(
		private readonly visitRepository: VisitRepository,
		private readonly timeService: TimeServiceContract,
		private readonly computeVisitHashService: ComputeVisitHashService,
	) {}

	async execute(input: TrackRedirectVisitInput) {
		const uniqueHash = await this.computeVisitHashService.execute({
			ipAddressRaw: input.ipAddressRaw,
			userAgent: input.userAgent,
		});

		const visit = Visit.create({
			id: VisitIdentifier.generate(),
			createdAt: this.timeService.now(),
			referer: input.referer,
			redirectId: input.redirectId,
			uniqueHash,
		});

		await this.visitRepository.save(visit);
	}
}
