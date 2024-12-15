import { defineConfig, transports } from '@adonisjs/mail';
import env from '#start/env';

const mailConfig = defineConfig({
	default: env.get('MAIL_DRIVER'),

	from: 'no-reply@romainlanz.com',

	/**
	 * The mailers object can be used to configure multiple mailers
	 * each using a different transport or same transport with different
	 * options.
	 */
	mailers: {
		smtp: transports.smtp({
			host: env.get('SMTP_HOST'),
			port: env.get('SMTP_PORT'),
		}),

		brevo: transports.brevo({
			baseUrl: 'https://api.brevo.com/v3',
			key: env.get('BREVO_API_KEY'),
		}),
	},
});

export default mailConfig;

declare module '@adonisjs/mail/types' {
	export interface MailersList extends InferMailers<typeof mailConfig> {}
}
