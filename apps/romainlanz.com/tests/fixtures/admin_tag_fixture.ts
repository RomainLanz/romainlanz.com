import { UserRepository } from '#auth/repositories/user_repository';
import { FindTagBySlugQuery } from '#taxonomies/queries/find_tag_by_slug_query';
import { AdminFactory, TagFactory } from '#tests/factories/index';
import { DatabaseFixture } from '#tests/fixtures/database_fixture';
import type { FactoryInsert } from '#tests/factories/index';
import type { ApiClient } from '@japa/api-client';

type TagInput = {
	name: string;
	slug?: string;
	color: string;
};

type TaxonomiesPageProps = {
	vm: {
		tags: Array<{ name: string; slug: string; color: string }>;
	};
};

export class AdminTagFixture extends DatabaseFixture {
	readonly #findTagBySlug = new FindTagBySlugQuery();
	readonly #userRepository = new UserRepository();

	givenTag(input: Partial<FactoryInsert<'tags'>> = {}) {
		return TagFactory.create(input);
	}

	async visitTaxonomiesAsAdmin(client: ApiClient) {
		const adminRecord = await AdminFactory.create();
		const admin = await this.#userRepository.findUserByEmail(adminRecord.email);

		if (!admin) {
			throw new Error('Admin user was not created');
		}

		const response = await client.get('/admin/taxonomies').loginAs(admin).withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('admin/taxonomies/list');

		return response.inertiaProps as TaxonomiesPageProps;
	}

	async createTagAsAdmin(client: ApiClient, input: TagInput, options: { followRedirects?: boolean } = {}) {
		const adminRecord = await AdminFactory.create();
		const admin = await this.#userRepository.findUserByEmail(adminRecord.email);

		if (!admin) {
			throw new Error('Admin user was not created');
		}

		const request = client
			.post('/admin/taxonomies/tags')
			.loginAs(admin)
			.withCsrfToken()
			.header('referer', '/admin/taxonomies/tags/create');

		if (options.followRedirects === false) {
			request.redirects(0);
		}

		return request.form(input);
	}

	async thenTagShouldExist(slug: string, expected: Required<TagInput>) {
		const tag = await this.#findTagBySlug.execute(slug);

		this.assert.deepEqual(
			{
				name: tag.props.name,
				slug: tag.props.slug,
				color: tag.props.color,
			},
			expected,
		);
	}
}
