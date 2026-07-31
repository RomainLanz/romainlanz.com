import { db } from '#shared/services/db';

export class GetArticleForUpdateQuery {
	async execute(id: string) {
		const [article, tags] = await Promise.all([
			db.selectFrom('articles').selectAll().where('id', '=', id).executeTakeFirst(),
			db.selectFrom('tag_articles').select('tag_id').where('article_id', '=', id).execute(),
		]);

		if (!article) return undefined;

		return {
			...article,
			tag_ids: tags.map(({ tag_id }) => tag_id),
		};
	}
}
