import type { Identifier } from '#core/domain/identifier';

export abstract class Entity<TProperties extends { id: Identifier<any> }> {
	readonly props: TProperties;

	protected constructor(props: TProperties) {
		this.props = props;
	}

	getIdentifier() {
		return this.props.id;
	}

	equals(object: Entity<TProperties>) {
		if (this === object) {
			return true;
		}

		return this.getIdentifier().equals(object.getIdentifier()) || false;
	}
}
