import { test } from '@japa/runner';
import { RedirectIdentifier } from '#redirects/domain/redirect_identifier';
import { RedirectActionsFixture } from '#tests/fixtures/redirect_actions_fixture';

test.group('Redirect actions', (group) => {
	let fixture: RedirectActionsFixture;

	group.each.setup(() => {
		fixture = new RedirectActionsFixture();
		fixture.setup();

		return () => fixture.cleanup();
	});

	test('creates a redirect with a generated identifier', async ({ assert }) => {
		await fixture.createRedirect({
			destination: 'https://romainlanz.com/articles',
			slug: 'articles',
		});

		const createdRedirect = fixture.redirectRepository.createdRedirect!;

		assert.match(createdRedirect!.getIdentifier().toString(), /^[0-9a-f-]{36}$/);
		assert.equal(createdRedirect!.props.destination, 'https://romainlanz.com/articles');
		assert.equal(createdRedirect!.props.slug, 'articles');
	});

	test('tracks a redirect visit with its daily hash and request metadata', async ({ assert }) => {
		const redirectId = RedirectIdentifier.fromString('0190188f-e84d-7db6-a0b7-832acd63f1ab');

		await fixture.trackRedirectVisit({
			ipAddressRaw: '203.0.113.42',
			userAgent: 'Redirect test agent',
			referer: 'https://example.com/source',
			redirectId,
		});

		const savedVisit = fixture.visitRepository.savedVisit!;

		assert.deepEqual(fixture.computeVisitHashService.input, {
			ipAddressRaw: '203.0.113.42',
			userAgent: 'Redirect test agent',
		});
		assert.strictEqual(savedVisit!.props.createdAt, fixture.now);
		assert.strictEqual(savedVisit!.props.redirectId, redirectId);
		assert.equal(savedVisit!.props.referer, 'https://example.com/source');
		assert.equal(savedVisit!.props.uniqueHash, 'daily-visitor-hash');
	});
});
