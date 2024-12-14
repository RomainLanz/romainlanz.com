import { db } from '#core/services/db';
import { Redirect } from '#redirects/domain/redirect';
import { RedirectIdentifier } from '#redirects/domain/redirect_identifier';

interface StoreRedirectDTO {
	url: string;
	to: string;
}

export class RedirectRepository {
	async all() {
		const redirectRecords = await db
			.selectFrom('redirects')
			.select(['id', 'url', 'to', 'visit_count'])
			.orderBy('redirects.id')
			.execute();

		return redirectRecords.map((redirect) => {
			return Redirect.create({
				id: RedirectIdentifier.fromString(redirect.id),
				destination: redirect.to,
				slug: redirect.url,
			});
		});
	}

	async findByUrl(url: string) {
		const redirectRecord = await db
			.selectFrom('redirects')
			.where('url', '=', url)
			.select(['id', 'to'])
			.executeTakeFirstOrThrow();

		return Redirect.create({
			id: RedirectIdentifier.fromString(redirectRecord.id),
			destination: redirectRecord.to,
			slug: url,
		});
	}

	create(payload: StoreRedirectDTO) {
		return db
			.insertInto('redirects')
			.values({
				url: payload.url,
				to: payload.to,
				created_at: new Date(),
				updated_at: new Date(),
			})
			.execute();
	}

	delete(id: string) {
		return db.deleteFrom('redirects').where('id', '=', id).execute();
	}
}
