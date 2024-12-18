import { inject } from '@adonisjs/core';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import { RecordNotFoundException } from '#core/exceptions/record_not_found_exception';
import { db } from '#core/services/db';
import { Redirect } from '#redirects/domain/redirect';
import { RedirectIdentifier } from '#redirects/domain/redirect_identifier';

@inject()
export class RedirectRepository {
	constructor(private readonly timeService: TimeServiceContract) {}

	async all() {
		const redirectRecords = await db
			.selectFrom('redirects')
			.select(['id', 'destination', 'slug'])
			.orderBy('redirects.id')
			.execute();

		return redirectRecords.map((redirect) => {
			return Redirect.create({
				id: RedirectIdentifier.fromString(redirect.id),
				destination: redirect.destination,
				slug: redirect.slug,
			});
		});
	}

	async findBySlug(slug: string) {
		const redirectRecord = await db
			.selectFrom('redirects')
			.where('slug', '=', slug)
			.select(['id', 'destination'])
			.executeTakeFirst();

		if (!redirectRecord) {
			throw new RecordNotFoundException();
		}

		return Redirect.create({
			id: RedirectIdentifier.fromString(redirectRecord.id),
			destination: redirectRecord.destination,
			slug,
		});
	}

	create(redirect: Redirect) {
		return db
			.insertInto('redirects')
			.values({
				id: redirect.getIdentifier().toString(),
				created_at: this.timeService.now().toJSDate(),
				destination: redirect.props.destination,
				slug: redirect.props.slug,
			})
			.execute();
	}

	delete(id: RedirectIdentifier) {
		return db.deleteFrom('redirects').where('id', '=', id.toString()).execute();
	}
}
