import { assertExists } from '@adonisjs/core/helpers/assert';
import { sql } from 'kysely';
import { db } from '#core/services/db';
import type { Visit } from '#redirects/domain/visit';

export class VisitRepository {
	save(visit: Visit) {
		assertExists(visit.props.ipAddress, 'IP address is required');

		return db
			.insertInto('redirect_visits')
			.values({
				id: visit.getIdentifier().toString(),
				created_at: visit.props.createdAt.toJSDate(),
				ip_address: visit.props.ipAddress,
				referer: visit.props.referer,
				redirect_id: visit.props.redirectId.toString(),
			})
			.onConflict((builder) =>
				builder.column('ip_address').doUpdateSet({
					count: sql`redirect_visits.count + 1`,
				})
			)
			.execute();
	}
}
