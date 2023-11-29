import { App } from '#views/layouts/app'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { csrfField, route } from '#start/view'
import { Form } from '#views/components/form/form'
import { Button } from '#views/components/button'

export function Create() {
  return (
    <App>
      <MaxWidthWrapper>
        <h1>Ajouter une redirection</h1>

        <form action={route('admin.redirects.store')} method="post">
          {csrfField()}

          <Form.Group>
            <Form.Label for="url">URL</Form.Label>
            <Form.Input id="url" name="url" type="text" />
          </Form.Group>

          <Form.Group>
            <Form.Label for="to">Vers</Form.Label>
            <Form.Input id="to" name="to" type="text" />
          </Form.Group>

          <Button color="violet" type="submit">
            Sauvegarder
          </Button>
        </form>
      </MaxWidthWrapper>
    </App>
  )
}
