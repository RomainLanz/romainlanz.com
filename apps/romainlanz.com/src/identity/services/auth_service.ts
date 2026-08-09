import { inject } from '@adonisjs/core';
import hash from '@adonisjs/core/services/hash';
import { err, ok, type Result } from '#core/result';
import { User } from '#identity/domain/user';
import { UserRepository } from '#identity/repositories/user_repository';

export type AttemptAuthenticationError = {
	type: 'invalid_credentials';
};

@inject()
export class AuthService {
	constructor(private repository: UserRepository) {}

	/**
	 * Attempts to verify the user credentials.
	 */
	async attempt(email: string, password: string): Promise<Result<User, AttemptAuthenticationError>> {
		const user = await this.repository.findUserByEmail(email);

		if (!user) {
			//? This is a security measure to prevent timing attacks.
			await hash.use('scrypt').make('password');

			return err({ type: 'invalid_credentials' });
		}

		const hasValidPassword = await hash.verify(user.getPassword(), password);

		if (!hasValidPassword) {
			return err({ type: 'invalid_credentials' });
		}

		return ok(user);
	}
}
