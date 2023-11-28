import { Assets } from '#start/view'
import { Header } from '#views/partials/header.js'
import { Footer } from '#views/partials/footer.js'

interface AppProps {
  title?: string
  page?: string
  children: JSX.Element
}

export function App(props: AppProps) {
  const { title = 'RomainLanz', page, children } = props

  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>{title}</title>

        <Assets.Script entrypoint={'resources/js/app.js'} />
      </head>

      <body {...(page ? { 'data-page': page } : {})}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  )
}
