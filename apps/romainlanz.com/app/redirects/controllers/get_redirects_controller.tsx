import { inject } from '@adonisjs/core';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import { RedirectView } from '#views/pages/admin/redirects/redirects';

@inject()
export default class GetRedirectsController {
	constructor(private repository: RedirectRepository) {}

	async handle() {
		const redirects = await this.repository.all();

		return <RedirectView.Index redirects={redirects} />;
	}
}
