import { ValueObject } from '#core/domain/value_object';
import { v7 as randomUUID } from 'uuid';

export class Identifier<T extends string> extends ValueObject<{ value: string }> {
	// @ts-expect-error - This is a hack to make the type work
	readonly #_type: T;

	static generate<T extends Identifier<any>>(this: new (props: { value: string }) => T): T {
		return new this({ value: randomUUID() });
	}

	static fromString<T extends Identifier<any>>(this: new (props: { value: string }) => T, value: string): T {
		return new this({ value });
	}

	toString() {
		return this.props.value;
	}
}
