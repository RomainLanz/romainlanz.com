import { csrfField, route, space } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'
import { Form } from '#views/components/form/form'
import { Button } from '#views/components/button'
import { Master } from '#views/layouts/master'

export function Login() {
  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  return (
    <Master title="Connexion" page="auth">
      <section class="centered">
        <div class="card">
          <form
            class="stack"
            action={route('auth.login')}
            method="post"
            style={{
              ['--gap' as any]: space(3),
            }}
            up-main
            up-layer="parent"
            up-target="body"
            up-fail-target="form"
          >
            {flashMessages.has('error') && (
              <p class="form_error">Aucun compte n'a été trouvé avec les identifiants fournis.</p>
            )}

            {csrfField()}

            <Form.Group>
              <Form.Label title="Email" for="email" />
              <Form.Input name="email" autocomplete="email" />
            </Form.Group>

            <Form.Group>
              <Form.Label title="Mot de passe" for="password" />
              <Form.Input name="password" type="password" autocomplete="current-password" />
            </Form.Group>

            <div>
              <Form.Checkbox name={'remember_me'}>Se souvenir de moi</Form.Checkbox>
            </div>

            <Button color="yellow" type="submit">
              Se connecter
            </Button>
          </form>
        </div>
      </section>
    </Master>
  )
}
