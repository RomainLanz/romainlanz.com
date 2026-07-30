import { hash, randomBytes } from 'node:crypto';
import cache from '@adonisjs/cache/services/main';

interface ComputeVisitHashServiceParams {
	ipAddressRaw: string;
	userAgent: string;
}

export class ComputeVisitHashService {
	async execute(params: ComputeVisitHashServiceParams): Promise<string> {
		const dayToken = await this.#getDayToken();

		return hash('md5', `${dayToken}${params.ipAddressRaw}${params.userAgent}`);
	}

	#getDayToken(): Promise<string> {
		return cache.getOrSet({
			key: 'visit_hash_day_token',
			ttl: '24h',
			factory: () => {
				return randomBytes(32).toString('hex');
			},
		});
	}
}
