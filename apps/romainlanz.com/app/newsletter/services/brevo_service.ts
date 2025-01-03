import env from '#start/env';

export class BrevoService {
	async sendDoubleOptInConfirmation(email: string): Promise<void> {
		const response = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'api-key': env.get('BREVO_API_KEY') || '',
			},
			body: JSON.stringify({
				templateId: 5,
				email,
				includeListIds: [9],
				redirectionUrl: 'https://romainlanz.com/',
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to send double opt-in confirmation');
		}

		return;
	}
}
