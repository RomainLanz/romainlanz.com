import { test } from '@japa/runner';
import { PasteRepository } from '#paste/repositories/paste_repository';
import { migrateDatabase, truncateDatabase } from '#tests/database_test_utils';
import { PasteActionsFixture } from '#tests/fixtures/paste_actions_fixture';

test.group('Paste actions', (group) => {
	let fixture: PasteActionsFixture;

	group.each.setup(() => {
		fixture = new PasteActionsFixture();
		fixture.setup();

		return () => fixture.cleanup();
	});

	test('creates a paste with highlighted content and a generated identifier', async ({ assert }) => {
		const paste = await fixture.createPaste({
			content: 'const answer = 42;',
			lang: 'typescript',
			userId: undefined,
		});

		assert.deepEqual(fixture.highlightPasteContentService.input, {
			content: 'const answer = 42;',
			lang: 'typescript',
		});
		assert.strictEqual(fixture.pasteRepository.createdPaste, paste);
		assert.match(paste.getIdentifier().toString(), /^[0-9a-f-]{36}$/);
		assert.equal(paste.props.content, '<pre>Highlighted paste</pre>');
		assert.isUndefined(fixture.pasteRepository.userId);
	});
});

test.group('Paste repository', (group) => {
	group.each.setup(async () => {
		await migrateDatabase();
		await truncateDatabase();
	});

	test('returns null when a Paste identifier does not exist', async ({ assert }) => {
		const repository = new PasteRepository();

		assert.isNull(await repository.findById('7a28e15e-f122-4fa6-aaf2-64fc5d6b8d02'));
	});
});
