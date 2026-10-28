/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'admin.og.preview': {
    methods: ["GET","HEAD"],
    pattern: '/admin/og/preview',
    tokens: [[0,"admin"],[0,"og"],[0,"preview"]],
    types: placeholder as Registry['admin.og.preview']['types'],
  },
  'admin.articles.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/articles',
    tokens: [[0,"admin"],[0,"articles"]],
    types: placeholder as Registry['admin.articles.index']['types'],
  },
  'admin.articles.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/articles/create',
    tokens: [[0,"admin"],[0,"articles"],[0,"create"]],
    types: placeholder as Registry['admin.articles.create']['types'],
  },
  'admin.articles.store': {
    methods: ["POST"],
    pattern: '/admin/articles',
    tokens: [[0,"admin"],[0,"articles"]],
    types: placeholder as Registry['admin.articles.store']['types'],
  },
  'admin.articles.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/articles/:id/edit',
    tokens: [[0,"admin"],[0,"articles"],[1,"id"],[0,"edit"]],
    types: placeholder as Registry['admin.articles.edit']['types'],
  },
  'admin.articles.update': {
    methods: ["PUT"],
    pattern: '/admin/articles/:id',
    tokens: [[0,"admin"],[0,"articles"],[1,"id"]],
    types: placeholder as Registry['admin.articles.update']['types'],
  },
  'admin.pages.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/admin/dashboard',
    tokens: [[0,"admin"],[0,"dashboard"]],
    types: placeholder as Registry['admin.pages.dashboard']['types'],
  },
  'admin.redirects.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/redirects',
    tokens: [[0,"admin"],[0,"redirects"]],
    types: placeholder as Registry['admin.redirects.index']['types'],
  },
  'admin.redirects.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/redirects/create',
    tokens: [[0,"admin"],[0,"redirects"],[0,"create"]],
    types: placeholder as Registry['admin.redirects.create']['types'],
  },
  'admin.redirects.store': {
    methods: ["POST"],
    pattern: '/admin/redirects',
    tokens: [[0,"admin"],[0,"redirects"]],
    types: placeholder as Registry['admin.redirects.store']['types'],
  },
  'admin.redirects.delete': {
    methods: ["DELETE"],
    pattern: '/admin/redirects/:id',
    tokens: [[0,"admin"],[0,"redirects"],[1,"id"]],
    types: placeholder as Registry['admin.redirects.delete']['types'],
  },
  'admin.taxonomies.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/taxonomies',
    tokens: [[0,"admin"],[0,"taxonomies"]],
    types: placeholder as Registry['admin.taxonomies.index']['types'],
  },
  'admin.taxonomies.categories.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/taxonomies/categories/create',
    tokens: [[0,"admin"],[0,"taxonomies"],[0,"categories"],[0,"create"]],
    types: placeholder as Registry['admin.taxonomies.categories.create']['types'],
  },
  'admin.taxonomies.categories.store': {
    methods: ["POST"],
    pattern: '/admin/taxonomies/categories',
    tokens: [[0,"admin"],[0,"taxonomies"],[0,"categories"]],
    types: placeholder as Registry['admin.taxonomies.categories.store']['types'],
  },
  'admin.taxonomies.tags.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/taxonomies/tags/create',
    tokens: [[0,"admin"],[0,"taxonomies"],[0,"tags"],[0,"create"]],
    types: placeholder as Registry['admin.taxonomies.tags.create']['types'],
  },
  'admin.taxonomies.tags.store': {
    methods: ["POST"],
    pattern: '/admin/taxonomies/tags',
    tokens: [[0,"admin"],[0,"taxonomies"],[0,"tags"]],
    types: placeholder as Registry['admin.taxonomies.tags.store']['types'],
  },
  'admin.taxonomies.tags.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/taxonomies/tags/:id/edit',
    tokens: [[0,"admin"],[0,"taxonomies"],[0,"tags"],[1,"id"],[0,"edit"]],
    types: placeholder as Registry['admin.taxonomies.tags.edit']['types'],
  },
  'admin.taxonomies.tags.update': {
    methods: ["PUT"],
    pattern: '/admin/taxonomies/tags/:id',
    tokens: [[0,"admin"],[0,"taxonomies"],[0,"tags"],[1,"id"]],
    types: placeholder as Registry['admin.taxonomies.tags.update']['types'],
  },
  'articles.index': {
    methods: ["GET","HEAD"],
    pattern: '/articles',
    tokens: [[0,"articles"]],
    types: placeholder as Registry['articles.index']['types'],
  },
  'articles.og': {
    methods: ["GET","HEAD"],
    pattern: '/articles/:slug/og.png',
    tokens: [[0,"articles"],[1,"slug"],[0,"og.png"]],
    types: placeholder as Registry['articles.og']['types'],
  },
  'articles.show': {
    methods: ["GET","HEAD"],
    pattern: '/articles/:slug',
    tokens: [[0,"articles"],[1,"slug"]],
    types: placeholder as Registry['articles.show']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.logout': {
    methods: ["DELETE"],
    pattern: '/logout',
    tokens: [[0,"logout"]],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'api.assets.store': {
    methods: ["POST"],
    pattern: '/api/assets/images',
    tokens: [[0,"api"],[0,"assets"],[0,"images"]],
    types: placeholder as Registry['api.assets.store']['types'],
  },
  'healthz': {
    methods: ["GET","HEAD"],
    pattern: '/healthz',
    tokens: [[0,"healthz"]],
    types: placeholder as Registry['healthz']['types'],
  },
  'pages.landing': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [[0,"/"]],
    types: placeholder as Registry['pages.landing']['types'],
  },
  'pages.contact': {
    methods: ["GET","HEAD"],
    pattern: '/contact',
    tokens: [[0,"contact"]],
    types: placeholder as Registry['pages.contact']['types'],
  },
  'pages.contact.store': {
    methods: ["POST"],
    pattern: '/contact',
    tokens: [[0,"contact"]],
    types: placeholder as Registry['pages.contact.store']['types'],
  },
  'pages.about': {
    methods: ["GET","HEAD"],
    pattern: '/a-propos',
    tokens: [[0,"a-propos"]],
    types: placeholder as Registry['pages.about']['types'],
  },
  'pages.partners': {
    methods: ["GET","HEAD"],
    pattern: '/partenaires',
    tokens: [[0,"partenaires"]],
    types: placeholder as Registry['pages.partners']['types'],
  },
  'live.status': {
    methods: ["GET","HEAD"],
    pattern: '/live/status',
    tokens: [[0,"live"],[0,"status"]],
    types: placeholder as Registry['live.status']['types'],
  },
  'pastes.create': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [[0,"/"]],
    types: placeholder as Registry['pastes.create']['types'],
  },
  'pastes.store': {
    methods: ["POST"],
    pattern: '/',
    tokens: [[0,"/"]],
    types: placeholder as Registry['pastes.store']['types'],
  },
  'pastes.show': {
    methods: ["GET","HEAD"],
    pattern: '/:id',
    tokens: [[1,"id"]],
    types: placeholder as Registry['pastes.show']['types'],
  },
  'process_redirect.execute': {
    methods: ["GET","HEAD"],
    pattern: '/*',
    tokens: [[2,"*"]],
    types: placeholder as Registry['process_redirect.execute']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
