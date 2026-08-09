import { inject } from '@adonisjs/core';
import { Tag } from '#taxonomies/domain/tag';
import { TagRepository, type UpdateTagRepositoryError } from '#taxonomies/repositories/tag_repository';
import type { Result } from '#core/result';

interface UpdateTagInput {
	id: string;
	name: string;
	slug: string;
	color: string;
}

export type UpdateTagError = UpdateTagRepositoryError;

@inject()
export class UpdateTag {
	constructor(private repository: TagRepository) {}

	execute(input: UpdateTagInput): Promise<Result<Tag, UpdateTagError>> {
		return this.repository.update(input);
	}
}
