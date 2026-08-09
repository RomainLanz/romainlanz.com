import { inject } from '@adonisjs/core';
import { Tag } from '#taxonomies/domain/tag';
import { TagRepository, type CreateTagRepositoryError } from '#taxonomies/repositories/tag_repository';
import type { Result } from '#core/result';

interface CreateTagInput {
	name: string;
	color: string;
	slug?: string;
}

export type CreateTagError = CreateTagRepositoryError;

@inject()
export class CreateTag {
	constructor(private repository: TagRepository) {}

	execute(input: CreateTagInput): Promise<Result<Tag, CreateTagError>> {
		return this.repository.create(input);
	}
}
