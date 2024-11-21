import { db } from '#core/services/db';
import { Paste } from '#paste/domain/paste';
import { PasteIdentifier } from '#paste/domain/paste_identifier';

interface StorePasteDTO {
	content: string;
	userId: string | undefined;
}

export class PasteRepository {
	async findById(id: PasteIdentifier) {
		const record = await db
			.selectFrom('pastes')
			.select(['content'])
			.where('id', '=', id.toString())
			.executeTakeFirstOrThrow();

		return Paste.create({ id, content: record.content });
	}

	async create(payload: StorePasteDTO) {
		const id = PasteIdentifier.generate();

		await db
			.insertInto('pastes')
			.values({
				id: id.toString(),
				created_at: new Date(),
				content: payload.content,
				user_id: payload.userId,
			})
			.executeTakeFirst();

		return Paste.create({ id, content: payload.content });
	}
}
