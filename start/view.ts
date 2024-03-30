import vite from '@adonisjs/vite/services/main'
import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'

export function space(num: number) {
  return `calc(${num} * var(--space))`
}

export function currentYear() {
  return new Date().getFullYear()
}

export function route(...args: Parameters<typeof router.makeUrl>) {
  return router.makeUrl(...args)
}

export function csrfField() {
  const { request } = HttpContext.getOrFail()

  return Html.createElement('input', { type: 'hidden', value: request.csrfToken, name: '_csrf' })
}

function Image(props: JSX.HtmlImageTag) {
  if (!props.src) {
    throw new Error('Missing src prop for <Image />')
  }

  const url = vite.assetPath(props.src)

  return Html.createElement('img', { src: url, alt: props.alt, class: props.class })
}

async function Entrypoint(props: { entrypoints: string[] }) {
  const assets = await vite.generateEntryPointsTags(props.entrypoints)

  const elements = assets.map((asset) => {
    if (asset.tag === 'script') {
      return Html.createElement('script', {
        ...asset.attributes,
      })
    }

    return Html.createElement('link', {
      ...asset.attributes,
    })
  })

  return Html.createElement(Html.Fragment, {}, elements)
}

export const Vite = {
  Entrypoint,
  Image,
}
