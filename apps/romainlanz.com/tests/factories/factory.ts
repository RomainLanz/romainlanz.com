import { faker, type Faker } from '@faker-js/faker';
import { db as defaultDb } from '#core/services/db';
import type { DB } from '#types/db';
import type { Insertable, Kysely, Selectable } from 'kysely';

type TableName = keyof DB & string;

export type FactoryInsert<Table extends TableName> = Insertable<DB[Table]>;
export type FactoryRow<Table extends TableName> = Selectable<DB[Table]>;
export type FactoryFaker = Faker;
export type FactoryRelationValue<Table extends TableName> =
	| FactoryRow<Table>
	| Partial<FactoryInsert<Table>>
	| KyselyFactory<Table, any, any>;

type FactoryContext = {
	sequence: number;
	db: Kysely<DB>;
	faker: FactoryFaker;
};

type FactoryDefinition<Table extends TableName> = (
	context: FactoryContext,
) => Partial<FactoryInsert<Table>> | Promise<Partial<FactoryInsert<Table>>>;

type FactoryState<Table extends TableName> = (
	attributes: Partial<FactoryInsert<Table>>,
	context: FactoryContext,
) => Partial<FactoryInsert<Table>> | Promise<Partial<FactoryInsert<Table>>>;

export type FactoryForRelation<Table extends TableName, Value = unknown> = (
	attributes: Partial<FactoryInsert<Table>>,
	context: FactoryContext,
	value: Value | undefined,
) => Partial<FactoryInsert<Table>> | Promise<Partial<FactoryInsert<Table>>>;

export type FactoryWithRelation<Table extends TableName, Value = unknown> = (
	row: FactoryRow<Table>,
	context: FactoryContext,
	value: Value | undefined,
) => unknown | Promise<unknown>;

type ForRelationEntry<Table extends TableName> = {
	resolver: FactoryForRelation<Table, any>;
	useByDefault: boolean;
};

type ForRelationInput<Relation> = Relation extends FactoryForRelation<any, infer Value> ? Value : never;
type WithRelationInput<Relation> = Relation extends FactoryWithRelation<any, infer Value> ? Value : never;

export class KyselyFactory<
	Table extends TableName,
	ForRelations extends Record<string, FactoryForRelation<Table, any>> = {},
	WithRelations extends Record<string, FactoryWithRelation<Table, any>> = {},
> {
	#states: FactoryState<Table>[];
	#overrides: Partial<FactoryInsert<Table>>;
	#forRelations: Record<string, ForRelationEntry<Table>>;
	#withRelations: Record<string, FactoryWithRelation<Table, any>>;
	#requestedForRelations: { name: string; value: unknown }[];
	#requestedWithRelations: { name: string; value: unknown }[];

	constructor(
		readonly table: Table,
		readonly definition: FactoryDefinition<Table>,
		readonly db: Kysely<DB> = defaultDb,
		readonly nextSequence: () => number,
		states: FactoryState<Table>[] = [],
		overrides: Partial<FactoryInsert<Table>> = {},
		forRelations: Record<string, ForRelationEntry<Table>> = {},
		withRelations: Record<string, FactoryWithRelation<Table, any>> = {},
		requestedForRelations: { name: string; value: unknown }[] = [],
		requestedWithRelations: { name: string; value: unknown }[] = [],
	) {
		this.#states = states;
		this.#overrides = overrides;
		this.#forRelations = forRelations;
		this.#withRelations = withRelations;
		this.#requestedForRelations = requestedForRelations;
		this.#requestedWithRelations = requestedWithRelations;
	}

	use(db: Kysely<DB>) {
		return new KyselyFactory(
			this.table,
			this.definition,
			db,
			this.nextSequence,
			this.#states,
			this.#overrides,
			this.#forRelations,
			this.#withRelations,
			this.#requestedForRelations,
			this.#requestedWithRelations,
		);
	}

	merge(overrides: Partial<FactoryInsert<Table>>) {
		return new KyselyFactory(
			this.table,
			this.definition,
			this.db,
			this.nextSequence,
			this.#states,
			{
				...this.#overrides,
				...overrides,
			},
			this.#forRelations,
			this.#withRelations,
			this.#requestedForRelations,
			this.#requestedWithRelations,
		);
	}

	state(state: FactoryState<Table>) {
		return new KyselyFactory(
			this.table,
			this.definition,
			this.db,
			this.nextSequence,
			[...this.#states, state],
			this.#overrides,
			this.#forRelations,
			this.#withRelations,
			this.#requestedForRelations,
			this.#requestedWithRelations,
		);
	}

	forRelation<Name extends string, Value>(
		name: Name,
		resolver: FactoryForRelation<Table, Value>,
		options: { useByDefault?: boolean } = {},
	) {
		return new KyselyFactory<Table, ForRelations & Record<Name, FactoryForRelation<Table, Value>>, WithRelations>(
			this.table,
			this.definition,
			this.db,
			this.nextSequence,
			this.#states,
			this.#overrides,
			{
				...this.#forRelations,
				[name]: {
					resolver,
					useByDefault: options.useByDefault ?? false,
				},
			},
			this.#withRelations,
			this.#requestedForRelations,
			this.#requestedWithRelations,
		);
	}

	withRelation<Name extends string, Value>(name: Name, resolver: FactoryWithRelation<Table, Value>) {
		return new KyselyFactory<Table, ForRelations, WithRelations & Record<Name, FactoryWithRelation<Table, Value>>>(
			this.table,
			this.definition,
			this.db,
			this.nextSequence,
			this.#states,
			this.#overrides,
			this.#forRelations,
			{
				...this.#withRelations,
				[name]: resolver,
			},
			this.#requestedForRelations,
			this.#requestedWithRelations,
		);
	}

	for<Name extends keyof ForRelations & string>(name: Name, value?: ForRelationInput<ForRelations[Name]>) {
		return new KyselyFactory<Table, ForRelations, WithRelations>(
			this.table,
			this.definition,
			this.db,
			this.nextSequence,
			this.#states,
			this.#overrides,
			this.#forRelations,
			this.#withRelations,
			[...this.#requestedForRelations.filter((relation) => relation.name !== name), { name, value }],
			this.#requestedWithRelations,
		);
	}

	with<Name extends keyof WithRelations & string>(name: Name, value?: WithRelationInput<WithRelations[Name]>) {
		return new KyselyFactory<Table, ForRelations, WithRelations>(
			this.table,
			this.definition,
			this.db,
			this.nextSequence,
			this.#states,
			this.#overrides,
			this.#forRelations,
			this.#withRelations,
			this.#requestedForRelations,
			[...this.#requestedWithRelations, { name, value }],
		);
	}

	async make(overrides: Partial<FactoryInsert<Table>> = {}) {
		const { attributes } = await this.#makeWithContext(overrides);

		return attributes;
	}

	async #makeWithContext(overrides: Partial<FactoryInsert<Table>> = {}) {
		const sequence = this.nextSequence();
		const context = { sequence, db: this.db, faker };
		let attributes = {
			...(await this.definition(context)),
			...this.#overrides,
		};

		for (const state of this.#states) {
			attributes = {
				...attributes,
				...(await state(attributes, context)),
			};
		}

		const requestedForRelationNames = new Set(this.#requestedForRelations.map((relation) => relation.name));
		const defaultForRelations = Object.entries(this.#forRelations)
			.filter(([name, relation]) => relation.useByDefault && !requestedForRelationNames.has(name))
			.map(([name]) => ({ name, value: undefined }));

		for (const { name, value } of [...defaultForRelations, ...this.#requestedForRelations]) {
			const relation = this.#forRelations[name];

			if (!relation) {
				throw new Error(`Unknown "${name}" relation on "${this.table}" factory`);
			}

			attributes = {
				...attributes,
				...(await relation.resolver(attributes, context, value)),
			};
		}

		return {
			context,
			attributes: {
				...attributes,
				...overrides,
			} as FactoryInsert<Table>,
		};
	}

	async makeMany(count: number, overrides: Partial<FactoryInsert<Table>> = {}) {
		return Promise.all(Array.from({ length: count }, () => this.make(overrides)));
	}

	async create(overrides: Partial<FactoryInsert<Table>> = {}) {
		const { attributes, context } = await this.#makeWithContext(overrides);
		const row = (await this.db
			.insertInto(this.table)
			.values(attributes)
			.returningAll()
			.executeTakeFirstOrThrow()) as FactoryRow<Table>;

		for (const { name, value } of this.#requestedWithRelations) {
			const relation = this.#withRelations[name];

			if (!relation) {
				throw new Error(`Unknown "${name}" relation on "${this.table}" factory`);
			}

			await relation(row, context, value);
		}

		return row;
	}

	async createMany(count: number, overrides: Partial<FactoryInsert<Table>> = {}) {
		return Promise.all(Array.from({ length: count }, () => this.create(overrides)));
	}
}

export async function resolveRelation<Table extends TableName>(
	factory: KyselyFactory<Table, any, any>,
	value: FactoryRelationValue<Table> | undefined,
	db: Kysely<DB>,
) {
	if (value instanceof KyselyFactory) {
		return value.use(db).create();
	}

	if (value && 'id' in value) {
		return value as FactoryRow<Table>;
	}

	return factory.use(db).create(value as Partial<FactoryInsert<Table>> | undefined);
}

export function defineFactory<Table extends TableName>(
	table: Table,
	definition: FactoryDefinition<Table>,
	db: Kysely<DB> = defaultDb,
) {
	let sequence = 0;

	return new KyselyFactory(table, definition, db, () => {
		sequence += 1;

		return sequence;
	});
}
