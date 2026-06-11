import { db } from '#core/services/db';

export class CountPublishedArticlesQuery {
	async execute() {
		const countQueryResult = await db
			.selectFrom('articles')
			.select((builder) => builder.fn.count('articles.id').as('count'))
			.where('published_at', 'is not', null)
			.where('published_at', '<=', new Date())
			.execute();

		return Number(countQueryResult[0].count);
	}
}
