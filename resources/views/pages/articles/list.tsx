import { space } from '#start/view'
import { App } from '#views/layouts/app'
import { Article } from '#views/components/article/article'
import { Grid } from '#views/components/grid'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import type { ArticlePaginatedQueryResult } from '#articles/repositories/article_repository'

interface ListProps {
  posts: ArticlePaginatedQueryResult
}

export function List(props: ListProps) {
  const { posts } = props

  return (
    <App title="asd" page="articles">
      <MaxWidthWrapper>
        <h1>Tous les articles</h1>

        <Grid columns={3} gap={space(6)}>
          <aside class="grid-span-1">
            <h3>Categories</h3>
          </aside>

          <section class="grid-span-2">
            {posts.map((post) => (
              <Article.Card
                title={post.title}
                date={post.published_at}
                href={post.slug}
                tags={[{ color: 'cyan', label: 'adonis' }]}
              >
                {post.description}
              </Article.Card>
            ))}
          </section>
        </Grid>
      </MaxWidthWrapper>
    </App>
  )
}
