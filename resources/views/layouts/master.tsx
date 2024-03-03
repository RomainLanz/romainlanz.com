import { Vite } from '#start/view'

interface MasterProps {
  title?: string
  page?: string
  children: JSX.Element
}

export function Master(props: MasterProps) {
  const { title = 'RomainLanz', page, children } = props

  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <title>{title}</title>

          <Vite.Entrypoint entrypoints={['resources/css/app.scss', 'resources/js/app.ts']} />
        </head>

        <body {...(page ? { 'data-page': page } : {})}>{children}</body>
      </html>
    </>
  )
}
