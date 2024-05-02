import { space } from '#start/view'
import { App } from '#views/layouts/app'
import { Article } from '#views/components/article/article'
import { Grid } from '#views/components/grid'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import type { ArticlePaginatedQueryResult } from '#articles/repositories/article_repository'

interface ListProps {
  articles: ArticlePaginatedQueryResult
}

export function List(props: ListProps) {
  const { articles } = props

  return (
    <App title="asd" page="articles">
      <MaxWidthWrapper>
        <h1>Tous les articles</h1>

        <Grid columns={3} gap={space(6)}>
          <aside class="grid-span-1">
            <h3>Categories</h3>
          </aside>

          <section class="grid-span-2">
            {articles.map((article) => (
              <Article.Card
                title={article.title}
                date={article.published_at}
                href={article.slug}
                tags={[{ color: 'cyan', label: 'adonis' }]}
              >
                {article.description}
              </Article.Card>
            ))}
          </section>
        </Grid>
      </MaxWidthWrapper>
    </App>
  )
}
