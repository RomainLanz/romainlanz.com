import { access, rm } from 'node:fs/promises';
import app from '@adonisjs/core/services/app';
import { test } from '@japa/runner';
import { UserRepository } from '#identity/repositories/user_repository';
import { migrateDatabase, truncateDatabase } from '#tests/database_test_utils';
import { AdminFactory, UserFactory } from '#tests/factories/index';

const png = Buffer.from(
	'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
	'base64',
);

const userRepository = new UserRepository();

async function createUser(factory: typeof UserFactory) {
	const record = await factory.create();
	const user = await userRepository.findUserByEmail(record.email);

	if (!user) {
		throw new Error('User was not created');
	}

	return user;
}

test.group('Image upload', (group) => {
	const uploadedFiles: string[] = [];

	group.each.setup(async () => {
		await migrateDatabase();
		await truncateDatabase();
	});

	group.each.teardown(async () => {
		await Promise.all(uploadedFiles.splice(0).map((filePath) => rm(app.makePath('public', filePath), { force: true })));
	});

	test('stores an uploaded image for an administrator', async ({ client, assert }) => {
		const admin = await createUser(AdminFactory);
		const response = await client
			.post('/api/assets/images')
			.loginAs(admin)
			.file('image', png, { filename: 'pixel.png', contentType: 'image/png' });

		response.assertStatus(200);
		const filePath = response.body().data.filePath as string;
		uploadedFiles.push(filePath);

		assert.match(filePath, /^uploads\/[0-9a-f-]{36}\.png$/);
		await access(app.makePath('public', filePath));
	});

	test('requires an image', async ({ client }) => {
		const admin = await createUser(AdminFactory);
		const response = await client.post('/api/assets/images').loginAs(admin);

		response.assertStatus(400);
		response.assertBody({ errors: [{ message: 'Image is required' }] });
	});

	test('rejects unsupported file extensions', async ({ client }) => {
		const admin = await createUser(AdminFactory);
		const response = await client
			.post('/api/assets/images')
			.loginAs(admin)
			.file('image', Buffer.from('not an image'), { filename: 'notes.txt', contentType: 'text/plain' });

		response.assertStatus(400);
	});

	test('forbids image uploads from regular users', async ({ client }) => {
		const user = await createUser(UserFactory);
		const response = await client
			.post('/api/assets/images')
			.loginAs(user)
			.file('image', png, { filename: 'pixel.png', contentType: 'image/png' });

		response.assertStatus(403);
	});
});
