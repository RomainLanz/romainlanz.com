import mjml from 'mjml';
import { BaseMail } from '@adonisjs/mail';
import { Newsletter } from '#views/emails/newsletters/newsletter';
import router from '@adonisjs/core/services/router';

interface RegisterNewsletterNotificationParams {
	email: string;
	subscriptionId: string;
}

export class RegisterNewsletterNotification extends BaseMail {
	subject = '[RomainLanz] Confirmez votre inscription à la newsletter';

	constructor(private params: RegisterNewsletterNotificationParams) {
		super();
	}

	prepare() {
		const url = router.makeSignedUrl('newsletters.confirm', { id: this.params.subscriptionId });

		// @ts-expect-error - TODO: Change `mjml` to support JSX
		const html = mjml(<Newsletter.Register confirmationLink={url} />);

		this.message.to(this.params.email).html(html.html);
	}
}
