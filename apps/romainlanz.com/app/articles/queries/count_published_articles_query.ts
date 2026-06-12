import { inject } from '@adonisjs/core';
import { PublishedArticlesQueryBuilder } from '#articles/queries/published_articles_query_builder';

interface CountPublishedArticlesQueryInput {
	categorySlug: string | null;
	tagSlug: string | null;
}

@inject()
export class CountPublishedArticlesQuery {
	constructor(private publishedArticlesQueryBuilder: PublishedArticlesQueryBuilder) {}

	async execute(input: CountPublishedArticlesQueryInput) {
		const countQueryResult = await this.publishedArticlesQueryBuilder
			.build(input)
			.select((builder) => builder.fn.count('articles.id').as('count'))
			.execute();

		return Number(countQueryResult[0].count);
	}
}
