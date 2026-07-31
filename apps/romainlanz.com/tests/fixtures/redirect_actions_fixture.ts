import app from '@adonisjs/core/services/app';
import { DateTime } from 'luxon';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import { CreateRedirect } from '#redirects/actions/create_redirect';
import { TrackRedirectVisit } from '#redirects/actions/track_redirect_visit';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import { VisitRepository } from '#redirects/repositories/visit_repository';
import { ComputeVisitHashService } from '#redirects/services/compute_visit_hash_service';
import { TimeFreezeService } from '#shared/services/time_freeze_service';
import type { Redirect } from '#redirects/domain/redirect';
import type { RedirectIdentifier } from '#redirects/domain/redirect_identifier';
import type { Visit } from '#redirects/domain/visit';

export class FakeRedirectRepository {
	createdRedirect?: Redirect;

	async create(redirect: Redirect) {
		this.createdRedirect = redirect;
	}
}

export class FakeVisitRepository {
	savedVisit?: Visit;

	async save(visit: Visit) {
		this.savedVisit = visit;
	}
}

export class FakeComputeVisitHashService {
	input?: { ipAddressRaw: string; userAgent: string };

	async execute(input: { ipAddressRaw: string; userAgent: string }) {
		this.input = input;

		return 'daily-visitor-hash';
	}
}

export class RedirectActionsFixture {
	readonly redirectRepository = new FakeRedirectRepository();
	readonly visitRepository = new FakeVisitRepository();
	readonly computeVisitHashService = new FakeComputeVisitHashService();
	readonly now = DateTime.fromISO('2026-07-30T12:00:00.000Z');

	setup() {
		app.container.swap(RedirectRepository, () => this.redirectRepository as unknown as RedirectRepository);
		app.container.swap(VisitRepository, () => this.visitRepository as unknown as VisitRepository);
		app.container.swap(TimeServiceContract, () => new TimeFreezeService(this.now));
		app.container.swap(
			ComputeVisitHashService,
			() => this.computeVisitHashService as unknown as ComputeVisitHashService,
		);
	}

	cleanup() {
		app.container.restore(RedirectRepository);
		app.container.restore(VisitRepository);
		app.container.restore(TimeServiceContract);
		app.container.restore(ComputeVisitHashService);
	}

	async createRedirect(input: { destination: string; slug: string }) {
		const action = await app.container.make(CreateRedirect);

		await action.execute(input);
	}

	async trackRedirectVisit(input: {
		ipAddressRaw: string;
		userAgent: string;
		referer: string;
		redirectId: RedirectIdentifier;
	}) {
		const action = await app.container.make(TrackRedirectVisit);

		await action.execute(input);
	}
}
