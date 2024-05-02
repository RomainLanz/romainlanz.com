import { App } from '#views/layouts/app'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { Grid } from '#views/components/grid'
import { Article } from '#views/components/article/article'
import type { PostPaginatedQueryResult } from '#blog/repositories/post_repository'
import { space } from '#start/view'

interface ListProps {
  posts: PostPaginatedQueryResult
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
