import i18n from '@adonisjs/i18n/services/main'
import { Vite } from '#start/view'
import { App } from '#views/layouts/app'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { Flex } from '#views/components/flex'
import { Tag } from '#views/components/tag'
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
                  {Math.ceil(post.html_content.split(/\s+/).length / 225)}mn de lecture
                </span>
              </Flex>
            </Flex>
          </header>

          <div>{post.html_content}</div>
        </article>
      </MaxWidthWrapper>
    </App>
  )
}
