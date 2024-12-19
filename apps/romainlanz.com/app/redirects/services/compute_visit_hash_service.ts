import { hash, randomBytes } from 'node:crypto';
import { cache } from '#core/services/cache';

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
		return cache.getOrSet(
			'visit_hash_day_token',
			() => {
				return randomBytes(32).toString('hex');
			},
			{
				// TODO: Make it work like a crontab
				ttl: '24h',
			}
		);
	}
}
