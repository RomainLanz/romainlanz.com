import env from '#start/env';
import type { HttpContext } from '@adonisjs/core/http';

export default class HealthChecksController {
	async handle({ request, response }: HttpContext) {
		const secret = env.get('HEALTH_CHECK_SECRET');

		if (secret && request.header('x-health-check-secret') !== secret) {
			return response.unauthorized({ message: 'Unauthorized' });
		}

		const { healthChecks } = await import('#start/health');
		const report = await healthChecks.run();

		if (report.isHealthy) {
			return response.ok(report);
		}

		return response.serviceUnavailable(report);
	}
}
