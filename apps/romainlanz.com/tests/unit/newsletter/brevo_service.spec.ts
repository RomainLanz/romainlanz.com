import app from '@adonisjs/core/services/app';
import { test } from '@japa/runner';
import { BrevoService } from '#newsletter/services/brevo_service';

test.group('Brevo service', (group) => {
	const originalFetch = globalThis.fetch;

	group.each.teardown(() => {
		globalThis.fetch = originalFetch;
	});

	test('sends the newsletter double opt-in request to Brevo', async ({ assert }) => {
		let requestUrl: string | URL | Request | undefined;
		let requestInit: RequestInit | undefined;

		globalThis.fetch = (async (input, init) => {
			requestUrl = input;
			requestInit = init;

			return new Response(null, { status: 204 });
		}) as typeof fetch;

		const service = await app.container.make(BrevoService);
		await service.sendDoubleOptInConfirmation('subscriber@example.com');

		assert.equal(requestUrl, 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation');
		assert.equal(requestInit?.method, 'POST');
		assert.deepEqual(requestInit?.headers, {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'api-key': '',
		});
		assert.deepEqual(JSON.parse(requestInit?.body as string), {
			templateId: 5,
			email: 'subscriber@example.com',
			includeListIds: [9],
			redirectionUrl: 'https://romainlanz.com/',
		});
	});

	test('throws when Brevo rejects the double opt-in request', async ({ assert }) => {
		globalThis.fetch = (async () => new Response(null, { status: 500 })) as typeof fetch;

		const service = await app.container.make(BrevoService);

		await assert.rejects(
			() => service.sendDoubleOptInConfirmation('subscriber@example.com'),
			'Failed to send double opt-in confirmation',
		);
	});
});
