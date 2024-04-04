import i18n from '@adonisjs/i18n/services/main'
import { Vite } from '#start/view'
import { App } from '#views/layouts/app'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { Flex } from '#views/components/flex'
import { Tag } from '#views/components/tag'
import { MarkdownRenderer } from '#views/components/markdown_renderer'
import type { PostQueryResult } from '#blog/repositories/post_repository'

interface BlogShowProps {
  post: PostQueryResult
}

export function Show(props: BlogShowProps) {
  const { post } = props

  return (
    <App title={post.title} page="article">
      <MaxWidthWrapper>
        <article>
          <header>
            <Vite.Image src="resources/images/categories/adonis.svg" />

            <Flex gap={8} direction="column">
              <time datetime={post.created_at}>
                {i18n.locale('fr').formatDate(post.created_at, { dateStyle: 'long' })}
              </time>

              <h1>{post.title}</h1>

              <Flex class="w-full" gap={12} align="center" justify="start">
                <Tag label="JavaScript" color="yellow" />
                <Tag label="Database" color="cyan" />
                <Tag label="AdonisJS" color="violet" />
                <span class="reading-time">
                  {Math.ceil(post.markdown_content.split(/\s+/).length / 225)}mn de lecture
                </span>
              </Flex>
            </Flex>
          </header>

          <MarkdownRenderer ast={post.markdown_ast.children} />
        </article>
      </MaxWidthWrapper>
    </App>
  )
}
