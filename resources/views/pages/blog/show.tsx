import { App } from '#views/layouts/app'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'

export function Show(props: any) {
  const { post } = props

  return (
    <App title={post.title} page="article">
      <MaxWidthWrapper>
        <article>
          <h1 class="page_title">{post.title}</h1>

          <div>{post.html_content}</div>
        </article>
      </MaxWidthWrapper>
    </App>
  )
}
