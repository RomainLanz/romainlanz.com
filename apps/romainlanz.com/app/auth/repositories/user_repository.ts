import { User } from '#auth/domain/user';
import { UserIdentifier } from '#auth/domain/user_identifier';
import { UserRole } from '#auth/enums/user_role';
import { db } from '#core/services/db';

export class UserRepository {
	async findUserByEmail(email: string) {
		const userRecord = await db.selectFrom('users').selectAll().where('email', '=', email).executeTakeFirst();

		if (!userRecord) {
			return null;
		}

		return User.create({
			id: UserIdentifier.fromString(userRecord.id),
			name: userRecord.name,
			password: userRecord.password,
			email: userRecord.email,
			avatarUrl: userRecord.avatar_url,
			isAdmin: userRecord.role === UserRole.Admin,
		});
	}
}
