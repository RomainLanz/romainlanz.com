import { db } from '#core/services/db';

export class GetArticleForUpdateQuery {
	execute(id: string) {
		return db.selectFrom('articles').selectAll().where('id', '=', id).executeTakeFirst();
	}
}
