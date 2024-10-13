import { route } from '#start/view';
import { App } from '#views/layouts/app';
import { Hero } from '#views/partials/hero';
import { Flex } from '#views/components/flex';
import { Grid } from '#views/components/grid';
import { Article } from '#views/components/article/article';
import type { ArticleLastFourPublishedQueryResult } from '#articles/repositories/article_repository';

interface LandingProps {
	articles: ArticleLastFourPublishedQueryResult;
}

export function Landing(props: LandingProps) {
	const { articles } = props;

	return (
		<App>
			<>
				<Hero />

				<main class="max-width-wrapper">
					<Flex class="mb-6" align="baseline" justify="space-between">
						<>
							<h3 class="section-title">Mes derniers articles</h3>
							<a class="uppercase" href="/articles">
								Tous
							</a>
						</>
					</Flex>

					<Grid columns={2} gap={16}>
						<>
							{articles.map((article) => (
								<Article.Card
									class="grid-span-1"
									date={article.published_at}
									title={article.title}
									href={route('articles.show', [article.slug])}
									tags={[{ color: 'cyan', label: 'JavaScript' }]}
								>
									{article.description}
								</Article.Card>
							))}
						</>
					</Grid>
				</main>
			</>
		</App>
	);
}
