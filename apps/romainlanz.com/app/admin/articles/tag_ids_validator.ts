import vine from '@vinejs/vine';
import { db } from '#shared/services/db';

const tagExists = vine.createRule(
	async (value, _, field) => {
		if (typeof value !== 'string') return;

		const tag = await db.selectFrom('tags').select('id').where('id', '=', value).executeTakeFirst();

		if (!tag) {
			field.report('Le Tag sélectionné n’existe pas.', 'tagExists', field);
		}
	},
	{ isAsync: true },
);

export const tagIdsValidator = vine.array(vine.string().uuid().use(tagExists())).distinct().optional();
