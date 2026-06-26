import { test } from '@japa/runner';

test.group('Health checks', () => {
	test('returns the readiness report with the Kysely check', async ({ client, assert }) => {
		const response = await client.get('/healthz');
		const body = response.body();
		const [kyselyCheck] = body.checks;

		response.assertStatus(200);
		assert.equal(body.isHealthy, true);
		assert.equal(kyselyCheck.name, 'Kysely database check');
		assert.equal(kyselyCheck.status, 'ok');
	});
});
