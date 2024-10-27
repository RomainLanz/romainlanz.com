import type { Category } from '#categories/domain/category';

export type AllCategoryViewModelSerialized = ReturnType<AllCategoryViewModel['serialize']>;

export class AllCategoryViewModel {
	constructor(private categories: Category[]) {}

	static fromDomain(categories: Category[]) {
		return new this(categories);
	}

	serialize() {
		return this.categories.map((category) => ({
			id: category.getIdentifier().toString(),
			name: category.props.name,
			illustrationName: category.props.illustrationName,
		}));
	}
}
