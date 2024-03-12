import { Assets, Vite } from '#start/view'
import { Header } from '#views/partials/header'
import { Footer } from '#views/partials/footer'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { Sidebar } from '#views/partials/admin/sidebar'

interface AppProps {
  title?: string
  page?: string
  children: JSX.Element
}

export function Admin(props: AppProps) {
  const { title = 'RomainLanz', page, children } = props

  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="view-transition" content="same-origin" />

          <title>{title}</title>

          <Vite.Entrypoint entrypoints={['resources/css/app.scss', 'resources/ts/app.ts']} />
        </head>

        <body>
          <Header />

          <main {...(page ? { 'data-page': page } : {})} up-main>
            <MaxWidthWrapper>
              <>
                <h1 class="page_title">{title}</h1>

                <div class="admin_wrapper">
                  <Sidebar />

                  <div>{children}</div>
                </div>
              </>
            </MaxWidthWrapper>
          </main>

          <Footer />
        </body>
      </html>
    </>
  )
}
