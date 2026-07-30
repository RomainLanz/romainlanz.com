import { inject } from '@adonisjs/core';
import { TagRepository } from '#taxonomies/repositories/tag_repository';

interface CreateTagInput {
	name: string;
	color: string;
	slug?: string;
}

@inject()
export class CreateTag {
	constructor(private repository: TagRepository) {}

	execute(input: CreateTagInput) {
		return this.repository.create(input);
	}
}
