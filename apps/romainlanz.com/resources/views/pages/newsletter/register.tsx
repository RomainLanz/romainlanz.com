import { csrfField, route } from '#start/view'
import { Form } from '#views/components/form/form'
import { Button } from '#views/components/button'

export function Register() {
  return (
    <section id="newsletter_registration" class="footer__section">
      <h4>Newsletter</h4>

      <p>Inscrivez-vous à la newsletter pour recevoir les derniers articles.</p>

      <form action={route('newsletters.register')} method="post">
        {csrfField()}

        <Form.Input name="email" type="email" />

        <Button size="small" type="submit">
          S'abonner
        </Button>
      </form>
    </section>
  )
}
