import edge from 'edge.js'
import vite from '@adonisjs/vite/services/main'
import { cx, cva } from 'class-variance-authority'
import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'

edge.global('space', function (space: number) {
  return `calc(${space} * var(--space))`
})

edge.global('cva', function (base: Parameters<typeof cva>[0], config: Parameters<typeof cva>[1]) {
  return cva(base, config)
})

edge.global('cx', function (inputs: Parameters<typeof cx>) {
  return cx(inputs)
})

edge.global('range', function (start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i)
})

export function space(num: number) {
  return `calc(${num} * var(--space))`
}

export function route(...args: Parameters<typeof router.makeUrl>) {
  return router.makeUrl(...args)
}

export function csrfField() {
  const { request } = HttpContext.getOrFail()

  return Html.createElement('input', { type: 'hidden', value: request.csrfToken, name: '_csrf' })
}

function Image(props: { src: string; alt?: string; class?: string }) {
  const url = vite.assetPath(props.src)

  return Html.createElement('img', { src: url, alt: props.alt, class: props.class })
}

function ScriptAsset(props: { entrypoint: string }) {
  const assets = vite.generateEntryPointsTags(props.entrypoint)

  const elements = assets.map((asset) => {
    if (asset.tag === 'script') {
      return Html.createElement('script', {
        ...asset.attributes,
      })
    } else {
      return Html.createElement('link', {
        ...asset.attributes,
      })
    }
  })

  return Html.createElement(Html.Fragment, {}, elements)
}

export const Assets = {
  Script: ScriptAsset,
  Image,
}
