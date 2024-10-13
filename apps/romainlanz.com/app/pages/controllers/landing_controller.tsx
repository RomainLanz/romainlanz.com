import { inject } from '@adonisjs/core';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { Landing } from '#views/pages/landing';

@inject()
export default class LandingController {
	constructor(private repository: ArticleRepository) {}

	async render() {
		const articles = await this.repository.findLastFourPublished();

		return <Landing articles={articles} />;
	}
}
