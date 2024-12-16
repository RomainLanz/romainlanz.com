import string from '@adonisjs/core/helpers/string';
import { db } from '#core/services/db';
import { NewsletterSubscriptionStatus } from '#newsletter/enums/newsletter_subscription_status';

export class NewsletterRepository {
	storeSubscription(email: string) {
		return db
			.insertInto('newsletters')
			.values({
				created_at: new Date(),
				unsubscribe_token: string.random(255),
				email,
			})
			.returning('id')
			.executeTakeFirstOrThrow();
	}

	findById(id: string) {
		return db.selectFrom('newsletters').where('id', '=', id).select('id').executeTakeFirstOrThrow();
	}

	confirmSubscription(id: string) {
		return db
			.updateTable('newsletters')
			.set('subscription_status', NewsletterSubscriptionStatus.Confirmed)
			.where('id', '=', id)
			.execute();
	}
}
