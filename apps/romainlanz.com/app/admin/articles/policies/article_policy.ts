import { BasePolicy } from '@adonisjs/bouncer';
import type { User } from '#auth/domain/user';

export class ArticlePolicy extends BasePolicy {
	create(user: User) {
		return user.isAdmin();
	}

	update(user: User) {
		return user.isAdmin();
	}
}
