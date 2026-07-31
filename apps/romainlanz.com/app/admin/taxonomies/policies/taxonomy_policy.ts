import { BasePolicy } from '@adonisjs/bouncer';
import type { User } from '#identity/domain/user';

export class TaxonomyPolicy extends BasePolicy {
	manage(user: User) {
		return user.isAdmin();
	}
}
