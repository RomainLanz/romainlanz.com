import { UserRepository } from '#identity/repositories/user_repository';
import { db } from '#shared/services/db';
import { FindTagBySlugQuery } from '#taxonomies/queries/find_tag_by_slug_query';
import { AdminFactory, TagFactory, UserFactory } from '#tests/factories/index';
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

type UpdateTagPageProps = {
	tag: { id: string; name: string; slug: string; color: string };
};

export class AdminTagFixture extends DatabaseFixture {
	readonly #findTagBySlug = new FindTagBySlugQuery();
	readonly #userRepository = new UserRepository();

	givenTag(input: Partial<FactoryInsert<'tags'>> = {}) {
		return TagFactory.create(input);
	}

	async givenUser() {
		const userRecord = await UserFactory.create();
		const user = await this.#userRepository.findUserByEmail(userRecord.email);

		if (!user) {
			throw new Error('User was not created');
		}

		return user;
	}

	async visitTaxonomiesAsAdmin(client: ApiClient) {
		const admin = await this.createAdmin();
		const response = await client.get('/admin/taxonomies').loginAs(admin).withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('admin/taxonomies/list');

		return response.inertiaProps as TaxonomiesPageProps;
	}

	async createTagAsAdmin(client: ApiClient, input: TagInput, options: { followRedirects?: boolean } = {}) {
		const admin = await this.createAdmin();
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

	async visitTagUpdateAsAdmin(client: ApiClient, id: string) {
		const admin = await this.createAdmin();
		const response = await client.get(`/admin/taxonomies/tags/${id}/edit`).loginAs(admin).withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('admin/taxonomies/tags/update');

		return response.inertiaProps as UpdateTagPageProps;
	}

	async updateTagAsAdmin(
		client: ApiClient,
		id: string,
		input: Required<TagInput>,
		options: { followRedirects?: boolean } = {},
	) {
		const admin = await this.createAdmin();
		const request = client
			.put(`/admin/taxonomies/tags/${id}`)
			.loginAs(admin)
			.withCsrfToken()
			.header('referer', `/admin/taxonomies/tags/${id}/edit`);

		if (options.followRedirects === false) {
			request.redirects(0);
		}

		return request.form(input);
	}

	async thenTagShouldExist(slug: string, expected: Required<TagInput>) {
		const result = await this.#findTagBySlug.execute(slug);

		if (!result.ok) {
			throw new Error(`Expected Tag "${slug}" to exist`);
		}

		this.assert.deepEqual(
			{
				name: result.value.props.name,
				slug: result.value.props.slug,
				color: result.value.props.color,
			},
			expected,
		);
	}

	async thenTagShouldNotExist(slug: string) {
		const tag = await db.selectFrom('tags').selectAll().where('slug', '=', slug).executeTakeFirst();

		this.assert.isUndefined(tag);
	}

	private async createAdmin() {
		const adminRecord = await AdminFactory.create();
		const admin = await this.#userRepository.findUserByEmail(adminRecord.email);

		if (!admin) {
			throw new Error('Admin user was not created');
		}

		return admin;
	}
}
