export abstract class ValueObject<T extends Record<string, any>> {
	props: T;

	constructor(props: T) {
		this.props = {
			...props,
		};
	}

	equals(vo?: ValueObject<T>): boolean {
		if (vo === null || vo === undefined) {
			return false;
		}

		if (vo.props === undefined) {
			return false;
		}

		return JSON.stringify(this.props) === JSON.stringify(vo.props);
	}
}
