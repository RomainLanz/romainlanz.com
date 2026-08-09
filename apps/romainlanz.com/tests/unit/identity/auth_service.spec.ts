import app from '@adonisjs/core/services/app';
import hash from '@adonisjs/core/services/hash';
import { test } from '@japa/runner';
import { User } from '#identity/domain/user';
import { UserIdentifier } from '#identity/domain/user_identifier';
import { UserRepository } from '#identity/repositories/user_repository';
import { AuthService } from '#identity/services/auth_service';

class FakeUserRepository {
	email?: string;
	user: User | null = null;

	async findUserByEmail(email: string) {
		this.email = email;

		return this.user;
	}
}

test.group('Auth service', (group) => {
	let repository: FakeUserRepository;

	group.each.setup(() => {
		repository = new FakeUserRepository();
		app.container.swap(UserRepository, () => repository as unknown as UserRepository);

		return () => app.container.restore(UserRepository);
	});

	test('returns the user when the credentials are valid', async ({ assert }) => {
		repository.user = User.create({
			id: UserIdentifier.generate(),
			name: 'Romain Lanz',
			email: 'romain@example.com',
			password: await hash.make('secret-password'),
			avatarUrl: null,
			isAdmin: true,
		});
		const authService = await app.container.make(AuthService);

		const result = await authService.attempt('romain@example.com', 'secret-password');

		assert.isTrue(result.ok);
		if (!result.ok) return;
		assert.strictEqual(result.value, repository.user);
		assert.equal(repository.email, 'romain@example.com');
	});

	test('rejects an invalid password', async ({ assert }) => {
		repository.user = User.create({
			id: UserIdentifier.generate(),
			name: 'Romain Lanz',
			email: 'romain@example.com',
			password: await hash.make('secret-password'),
			avatarUrl: null,
			isAdmin: true,
		});
		const authService = await app.container.make(AuthService);

		assert.deepEqual(await authService.attempt('romain@example.com', 'invalid-password'), {
			ok: false,
			error: { type: 'invalid_credentials' },
		});
	});

	test('rejects an unknown user', async ({ assert }) => {
		const authService = await app.container.make(AuthService);

		assert.deepEqual(await authService.attempt('unknown@example.com', 'secret-password'), {
			ok: false,
			error: { type: 'invalid_credentials' },
		});
		assert.equal(repository.email, 'unknown@example.com');
	});
});
