import { csrfField, route } from '#start/view'
import { Admin } from '#views/layouts/admin'
import { Form } from '#views/components/form/form'
import { Button } from '#views/components/button'
import type { ArticleByIdQueryResult } from '#articles/repositories/article_repository'

interface UpdateProps {
  article: ArticleByIdQueryResult
}

export function Update(props: UpdateProps) {
  const { article } = props

  return (
    <Admin title="Édition de l'article">
      <div class="card">
        <form
          class="stack"
          action={route('admin.articles.update', [article.id], { qs: { _method: 'PUT' } })}
          method="post"
        >
          {csrfField()}

          <Form.Group>
            <Form.Label title="Titre *" for="title" />
            <Form.Input name="title" value={article.title} />
          </Form.Group>

          <Form.Group>
            <Form.Label title="Canonical URL" for="canonicalUrl" />
            <Form.Input name="canonicalUrl" value={article.slug} />
          </Form.Group>

          <Form.Group>
            <Form.Label title="Contenu *" for="content" />
            <Form.EasyMDE name="markdownContent" defaultValue={article.markdown_content} />
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
