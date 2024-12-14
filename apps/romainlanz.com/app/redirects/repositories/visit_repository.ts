import { assertExists } from '@adonisjs/core/helpers/assert';
import { db } from '#core/services/db';
import { sql } from 'kysely';
import type { Visit } from '#redirects/domain/visit';

export class VisitRepository {
	save(visit: Visit) {
		assertExists(visit.props.ipAddress, 'IP address is required');

		return db
			.insertInto('visits')
			.values({
				id: visit.getIdentifier().toString(),
				created_at: visit.props.createdAt.toJSDate(),
				ip_address: visit.props.ipAddress,
				referer: visit.props.referer,
				redirect_id: visit.props.redirectId.toString(),
			})
			.onConflict((builder) =>
				builder.column('ip_address').doUpdateSet({
					count: sql`visits.count + 1`,
				})
			)
			.execute();
	}
}
