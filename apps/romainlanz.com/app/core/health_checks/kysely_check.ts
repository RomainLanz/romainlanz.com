import { BaseCheck, Result } from '@adonisjs/core/health';
import { sql } from 'kysely';
import { db } from '#core/services/db';
import type { HealthCheckResult } from '@adonisjs/core/types/health';

export class KyselyCheck extends BaseCheck {
	name = 'Kysely database check';

	async run(): Promise<HealthCheckResult> {
		const startedAt = performance.now();

		try {
			await sql`select 1`.execute(db);

			return Result.ok('Successfully connected to the database server').mergeMetaData({
				dialect: 'postgres',
				responseTimeInMilliseconds: Math.round((performance.now() - startedAt) * 100) / 100,
			});
		} catch (error) {
			return Result.failed('Unable to connect to the database server', this.toError(error));
		}
	}

	private toError(error: unknown) {
		if (error instanceof Error) return error;

		return new Error(String(error));
	}
}
