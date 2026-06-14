import { HealthChecks } from '@adonisjs/core/health';
import { KyselyCheck } from '#core/health_checks/kysely_check';

export const healthChecks = new HealthChecks().register([new KyselyCheck()]);
