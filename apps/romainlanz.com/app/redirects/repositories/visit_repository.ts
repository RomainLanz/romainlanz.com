import { sql } from 'kysely';
import { db } from '#core/services/db';
import type { Visit } from '#redirects/domain/visit';

export class VisitRepository {
	save(visit: Visit) {
		return db
			.insertInto('redirect_visits')
			.values({
				id: visit.getIdentifier().toString(),
				created_at: visit.props.createdAt.toJSDate(),
				unique_hash: visit.props.uniqueHash,
				referer: visit.props.referer,
				redirect_id: visit.props.redirectId.toString(),
			})
			.onConflict((builder) =>
				builder.column('unique_hash').doUpdateSet({
					count: sql`redirect_visits.count + 1`,
				})
			)
			.execute();
	}
}
