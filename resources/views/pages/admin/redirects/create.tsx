import { csrfField, route, space } from '#start/view'
import { Form } from '#views/components/form/form'
import { Button } from '#views/components/button'
import { Admin } from '#views/layouts/admin'

export function Create() {
  return (
    <Admin title="Ajouter une redirection">
      <div class="card">
        <form
          class="stack"
          action={route('admin.redirects.store')}
          method="post"
          style={{
            ['--gap' as any]: space(3),
          }}
          up-modal-scope
          up-layer="parent"
          up-target="body"
          up-fail-target="form"
        >
          {csrfField()}

          <Form.Group>
            <Form.Label for="url">URL</Form.Label>
            <Form.Input id="url" name="url" type="text" />
          </Form.Group>

          <Form.Group>
            <Form.Label for="to">Vers</Form.Label>
            <Form.Input id="to" name="to" type="text" />
          </Form.Group>

          <div>
            <Button color="violet" type="submit">
              Sauvegarder
            </Button>
          </div>
        </form>
      </div>
    </Admin>
  )
}
