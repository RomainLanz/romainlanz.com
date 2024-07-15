import { Layout } from '#views/emails/layout'

interface RegisterProps {
  confirmationLink: string
}

export function Register(props: RegisterProps) {
  const { confirmationLink } = props

  return (
    <Layout>
      <mj-section>
        <mj-column>
          <mj-text>Confirmez votre inscription à la newsletter</mj-text>
          <mj-text>
            Merci de vous être inscrit à notre newsletter. Pour confirmer votre inscription,
            veuillez cliquer sur le lien suivant.
          </mj-text>
          <mj-text>
            <a href={confirmationLink}>Confirmer mon inscription</a>
          </mj-text>
          <mj-text>
            Si vous n'êtes pas à l'origine de cette inscription, veuillez ignorer cet email.
          </mj-text>
        </mj-column>
      </mj-section>
    </Layout>
  )
}
