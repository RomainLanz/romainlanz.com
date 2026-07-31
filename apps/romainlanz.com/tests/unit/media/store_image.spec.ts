import { MultipartFileFactory } from '@adonisjs/core/factories/bodyparser';
import app from '@adonisjs/core/services/app';
import { test } from '@japa/runner';
import { StoreImage } from '#media/actions/store_image';

test.group('Store image', () => {
	test('moves the image to public uploads under a generated name', async ({ assert }) => {
		const image = new MultipartFileFactory().merge({ extname: 'png' }).create();
		let destination: string | undefined;
		let storedName: string | undefined;

		image.move = async (location, options) => {
			destination = location;
			storedName = options?.name;
		};

		const filePath = await new StoreImage().execute(image);

		assert.equal(destination, app.makePath('public/uploads'));
		assert.match(filePath, /^uploads\/[0-9a-f-]{36}\.png$/);
		assert.equal(storedName, filePath.slice('uploads/'.length));
	});
});
