import { App } from '#views/layouts/app'
import { csrfField, route } from '#start/view'
import { Form } from '#views/components/form/form'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { Button } from '#views/components/button'

export function Create() {
  return (
    <App>
      <MaxWidthWrapper>
        <h1 class="page_title">Création d'article</h1>

        <form class="stack" action={route('admin.blog.posts.store')} method="post">
          {csrfField()}

          <Form.Group>
            <Form.Label title="Titre" for="title" />
            <Form.Input name="title" />
          </Form.Group>

          <Form.Group>
            <Form.Label title="Canonical URL" for="canonicalUrl" />
            <Form.Input name="canonicalUrl" />
          </Form.Group>

          <Form.Group>
            <Form.Label title="Contenu" for="content" />
            <Form.EasyMDE name="content" />
          </Form.Group>

          <div>
            <Button type="submit">Créer</Button>
          </div>
        </form>
      </MaxWidthWrapper>
    </App>
  )
}
