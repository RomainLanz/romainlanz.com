import { ArticleStatus } from '#articles/enums/article_status';
import { UserRole } from '#auth/enums/user_role';
import { KyselyFactory, defineFactory, resolveRelation } from './factory.js';
import type { FactoryRelationValue } from './factory.js';

type TagRelationValue = number | FactoryRelationValue<'tags'> | FactoryRelationValue<'tags'>[];

export const UserFactory = defineFactory('users', ({ faker }) => ({
	id: faker.string.uuid(),
	created_at: faker.date.recent(),
	updated_at: null,
	name: faker.person.fullName(),
	email: faker.internet.email({ provider: 'example.com' }).toLowerCase(),
	password: 'password',
	avatar_url: null,
})).state((attributes) => ({
	role: attributes.role ?? UserRole.User,
}));

export const AdminFactory = UserFactory.merge({
	role: UserRole.Admin,
});

export const CategoryFactory = defineFactory('categories', ({ faker }) => ({
	id: faker.string.uuid(),
	name: faker.commerce.department(),
	slug: faker.helpers.slugify(faker.commerce.department()).toLowerCase(),
	illustration_name: 'code',
}));

export const TagFactory = defineFactory('tags', ({ faker }) => ({
	id: faker.string.uuid(),
	name: faker.word.noun(),
	color: faker.color.rgb(),
}));

export const ArticleFactory = defineFactory('articles', async ({ faker, sequence }) => {
	const title = faker.lorem.sentence({ min: 3, max: 6 });

	return {
		id: faker.string.uuid(),
		created_at: faker.date.recent(),
		updated_at: null,
		published_at: null,
		title,
		slug: faker.helpers.slugify(`${title} ${sequence}`).toLowerCase(),
		summary: faker.lorem.sentence(),
		content_html: `<p>${faker.lorem.paragraph()}</p>`,
		content_markdown: faker.lorem.paragraph(),
		status: ArticleStatus.Draft,
	};
})
	.forRelation(
		'category',
		async (_attributes, { db }, category?: FactoryRelationValue<'categories'>) => {
			const record = await resolveRelation(CategoryFactory, category, db);

			return {
				category_id: record.id,
			};
		},
		{ useByDefault: true },
	)
	.withRelation('tags', async (article, { db }, tags: TagRelationValue = 1) => {
		const relationValues =
			typeof tags === 'number' ? Array.from({ length: tags }, () => undefined) : Array.isArray(tags) ? tags : [tags];

		for (const tag of relationValues) {
			const record = await resolveRelation(TagFactory, tag, db);

			await db
				.insertInto('tag_articles')
				.values({
					article_id: article.id,
					tag_id: record.id,
				})
				.execute();
		}
	});

export const PublishedArticleFactory = ArticleFactory.state((_attributes, { faker }) => ({
	status: ArticleStatus.Public,
	published_at: faker.date.recent(),
}));

export const TagArticleFactory = defineFactory('tag_articles', () => ({}))
	.forRelation(
		'article',
		async (_attributes, { db }, article?: FactoryRelationValue<'articles'>) => {
			const record = await resolveRelation(ArticleFactory, article, db);

			return {
				article_id: record.id,
			};
		},
		{ useByDefault: true },
	)
	.forRelation(
		'tag',
		async (_attributes, { db }, tag?: FactoryRelationValue<'tags'>) => {
			const record = await resolveRelation(TagFactory, tag, db);

			return {
				tag_id: record.id,
			};
		},
		{ useByDefault: true },
	);

export const PasteFactory = defineFactory('pastes', ({ faker }) => ({
	id: faker.string.uuid(),
	created_at: faker.date.recent(),
	content: faker.lorem.paragraph(),
	user_id: null,
}));

export const AuthenticatedPasteFactory = PasteFactory.forRelation(
	'user',
	async (_attributes, { db }, user?: FactoryRelationValue<'users'>) => {
		const record = await resolveRelation(UserFactory, user, db);

		return {
			user_id: record.id,
		};
	},
	{ useByDefault: true },
);

export const RedirectFactory = defineFactory('redirects', ({ faker }) => ({
	id: faker.string.uuid(),
	created_at: faker.date.recent(),
	updated_at: null,
	slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
	destination: faker.internet.url(),
}));

export const RedirectVisitFactory = defineFactory('redirect_visits', ({ faker, sequence }) => ({
	id: faker.string.uuid(),
	created_at: faker.date.recent(),
	unique_hash: faker.string.uuid(),
	referer: null,
	count: sequence,
})).forRelation(
	'redirect',
	async (_attributes, { db }, redirect?: FactoryRelationValue<'redirects'>) => {
		const record = await resolveRelation(RedirectFactory, redirect, db);

		return {
			redirect_id: record.id,
		};
	},
	{ useByDefault: true },
);

export const NewsletterFactory = defineFactory('newsletters', ({ faker }) => ({
	id: faker.string.uuid(),
	created_at: faker.date.recent(),
	email: faker.internet.email({ provider: 'example.com' }).toLowerCase(),
	unsubscribe_token: faker.string.uuid(),
}));

export const CacheFactory = defineFactory('cache', ({ faker, sequence }) => ({
	key: faker.helpers.slugify(`${faker.word.noun()} ${sequence}`).toLowerCase(),
	value: JSON.stringify({ value: faker.lorem.word() }),
	expires_at: null,
}));

export { defineFactory, KyselyFactory };
export type {
	FactoryFaker,
	FactoryForRelation,
	FactoryInsert,
	FactoryRelationValue,
	FactoryRow,
	FactoryWithRelation,
} from './factory.js';
