import { test } from '@japa/runner';
import { LiveStatusFixture } from '#tests/fixtures/live_status_fixture';

test.group('Live status fragment', (group) => {
	let fixture: LiveStatusFixture;

	group.each.setup(() => {
		fixture = new LiveStatusFixture();

		return () => fixture.cleanup();
	});

	test('renders an offline fragment when Twitch cannot resolve the live status', async ({ client, assert }) => {
		const twitch = fixture.givenTwitchIsAvailable();
		twitch.alwaysFail();

		const response = await client.get('/live/status').withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('twitch/live_status');
		assert.equal(response.inertiaProps.isLive, false);
	});
});
