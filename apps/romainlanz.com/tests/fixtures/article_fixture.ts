import { ArticleStatus } from '#articles/enums/article_status';
import { ArticleFactory, CategoryFactory, TagFactory } from '#tests/factories/index';
import { DatabaseFixture } from '#tests/fixtures/database_fixture';
import type { FactoryInsert, FactoryRelationValue, FactoryRow } from '#tests/factories/index';
import type { ApiClient } from '@japa/api-client';
import type { Assert } from '@japa/assert';

type ArticleOverrides = Omit<Partial<FactoryInsert<'articles'>>, 'published_at' | 'status'>;

type ArticleListPageProps = {
	activeCategory: string | null;
	activeTag: string | null;
	activePage: number;
	categoryListingAllArticlesCount: number;
	paginationArticlesCount: number;
	vm: {
		articles: Array<{ title: string; slug: string }>;
	};
};

type PublishedArticleInput = ArticleOverrides & {
	category?: FactoryRelationValue<'categories'>;
	tags?: FactoryRelationValue<'tags'> | FactoryRelationValue<'tags'>[];
	publishedAt?: Date;
};

export class ArticleFixture extends DatabaseFixture {
	async visitArticles(client: ApiClient, query: Record<string, string | number> = {}) {
		const response = await client.get('/articles').qs(query).withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('articles/list');

		return response.inertiaProps as ArticleListPageProps;
	}

	assertArticleTitles(assert: Assert, props: ArticleListPageProps, expectedTitles: string[]) {
		assert.deepEqual(
			props.vm.articles.map((article) => article.title),
			expectedTitles,
		);
	}

	givenCategory(input: Partial<FactoryInsert<'categories'>> = {}) {
		return CategoryFactory.create(input);
	}

	givenTag(input: Partial<FactoryInsert<'tags'>> = {}) {
		return TagFactory.create(input);
	}

	async givenPublishedArticles(inputs: PublishedArticleInput[]) {
		const articles: FactoryRow<'articles'>[] = [];

		for (const input of inputs) {
			articles.push(await this.givenPublishedArticle(input));
		}

		return articles;
	}

	async givenPublishedArticle(input: PublishedArticleInput = {}) {
		const { category, tags, publishedAt, ...attributes } = input;
		const articleAttributes = {
			...attributes,
			published_at: publishedAt ?? new Date('2026-01-01T00:00:00.000Z'),
			status: ArticleStatus.Public,
		};

		let factory = category ? ArticleFactory.for('category', category) : ArticleFactory;
		const articleTags = Array.isArray(tags) ? tags : tags ? [tags] : [];

		for (const articleTag of articleTags) {
			factory = factory.with('tags', articleTag);
		}

		return factory.create(articleAttributes);
	}
}
