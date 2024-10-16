import { db } from '#core/services/db';
import { sql } from 'kysely';
import { ResultOf } from '#types/common';

interface StoreRedirectDTO {
	url: string;
	to: string;
}

export type RedirectListQueryResult = ResultOf<RedirectRepository, 'all'>;
export type RedirectQueryResult = ResultOf<RedirectRepository, 'findByUrl'>;

export class RedirectRepository {
	all() {
		return db.selectFrom('redirects').select(['id', 'url', 'to', 'visit_count']).orderBy('redirects.url').execute();
	}

	findByUrl(url: string) {
		return db.selectFrom('redirects').where('url', '=', url).select(['id', 'to']).executeTakeFirst();
	}

	increaseVisitCount(id: string) {
		return db
			.updateTable('redirects')
			.set('visit_count', sql`visit_count + 1`)
			.where('id', '=', id)
			.execute();
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
