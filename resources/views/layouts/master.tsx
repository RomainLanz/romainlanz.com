import { Vite } from '#start/view'

interface MasterProps {
  title?: string
  children: JSX.Element
}

export function Master(props: MasterProps) {
  const { title = 'RomainLanz', children } = props

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

        <body>{children}</body>
      </html>
    </>
  )
}
