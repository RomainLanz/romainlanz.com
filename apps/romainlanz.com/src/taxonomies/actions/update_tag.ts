import { inject } from '@adonisjs/core';
import { err, ok, type Result } from '#core/result';
import { Tag } from '#taxonomies/domain/tag';
import { TagRepository, type UpdateTagRepositoryError } from '#taxonomies/repositories/tag_repository';

interface UpdateTagInput {
	id: string;
	name: string;
	slug: string;
	color: string;
}

export type UpdateTagError = UpdateTagRepositoryError | { type: 'tag_not_found' };

@inject()
export class UpdateTag {
	constructor(private repository: TagRepository) {}

	async execute(input: UpdateTagInput): Promise<Result<Tag, UpdateTagError>> {
		const result = await this.repository.update(input);

		if (!result.ok) {
			return result;
		}

		if (!result.value) {
			return err({ type: 'tag_not_found' });
		}

		return ok(result.value);
	}
}
