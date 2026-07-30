import { db } from '#core/services/db';
import { Paste } from '#paste/domain/paste';
import { PasteIdentifier } from '#paste/domain/paste_identifier';

export class PasteRepository {
	async findById(id: string) {
		const record = await db.selectFrom('pastes').select(['content']).where('id', '=', id).executeTakeFirstOrThrow();

		return Paste.create({ id: PasteIdentifier.fromString(id), content: record.content });
	}

	async create(paste: Paste, userId: string | undefined) {
		return db
			.insertInto('pastes')
			.values({
				id: paste.getIdentifier().toString(),
				created_at: new Date(),
				content: paste.props.content,
				user_id: userId,
			})
			.executeTakeFirst();
	}
}
