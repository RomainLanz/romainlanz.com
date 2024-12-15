import type { Category } from '#taxonomies/domain/category';

export type AllTaxonomiesViewModelSerialized = ReturnType<AllTaxonomiesViewModel['serialize']>;

export class AllTaxonomiesViewModel {
	constructor(private categories: Category[]) {}

	static fromDomain(categories: Category[]) {
		return new this(categories);
	}

	serialize() {
		return {
			categories: this.categories.map((category) => ({
				id: category.getIdentifier().toString(),
				name: category.props.name,
				illustrationName: category.props.illustrationName,
			})),
		};
	}
}
