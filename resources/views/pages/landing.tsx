import { route } from '#start/view'
import { App } from '#views/layouts/app'
import { Hero } from '#views/partials/hero'
import { Flex } from '#views/components/flex'
import { Grid } from '#views/components/grid'
import { Article } from '#views/components/article/article'
import type { PostLastFourQueryResult } from '#blog/repositories/post_repository'

interface LandingProps {
  posts: PostLastFourQueryResult
}

export function Landing(props: LandingProps) {
  const { posts } = props

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
              {posts.map((post) => (
                <Article.Card
                  class="grid-span-1"
                  date={post.published_at.toISOString()}
                  title={post.title}
                  href={route('blog.posts.show', [post.slug])}
                  tags={[{ color: 'cyan', label: 'JavaScript' }]}
                >
                  {post.description}
                </Article.Card>
              ))}
            </>
          </Grid>
        </main>
      </>
    </App>
  )
}
