import { csrfField, route } from '#start/view'
import { Admin } from '#views/layouts/admin'
import { Form } from '#views/components/form/form'
import { Button } from '#views/components/button'
import type { PostByIdQueryResult } from '#blog/repositories/post_repository'

interface UpdateProps {
  post: PostByIdQueryResult
}

export function Update(props: UpdateProps) {
  const { post } = props

  return (
    <Admin title="Édition de l'article">
      <div class="card">
        <form
          class="stack"
          action={route('admin.blog.posts.update', [post.id], { qs: { _method: 'PUT' } })}
          method="post"
        >
          {csrfField()}

          <Form.Group>
            <Form.Label title="Titre *" for="title" />
            <Form.Input name="title" value={post.title} />
          </Form.Group>

          <Form.Group>
            <Form.Label title="Canonical URL" for="canonicalUrl" />
            <Form.Input name="canonicalUrl" value={post.slug} />
          </Form.Group>

          <Form.Group>
            <Form.Label title="Contenu *" for="content" />
            <Form.EasyMDE name="markdownContent" defaultValue={post.markdown_content} />
          </Form.Group>

          <div>
            <Button color="violet" type="submit">
              Modifier
            </Button>
          </div>
        </form>
      </div>
    </Admin>
  )
}
