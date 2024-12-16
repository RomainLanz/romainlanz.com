import { inject } from '@adonisjs/core';
import mail from '@adonisjs/mail/services/main';
import { RegisterNewsletterNotification } from '#newsletter/mails/register_newsletter_notification';
import { NewsletterRepository } from '#newsletter/repositories/newsletter_repository';

@inject()
export class NewsletterRegistration {
	constructor(private repository: NewsletterRepository) {}

	async execute(email: string) {
		const subscription = await this.repository.storeSubscription(email);

		await mail.sendLater(
			new RegisterNewsletterNotification({
				email,
				subscriptionId: subscription.id,
			})
		);
	}
}
