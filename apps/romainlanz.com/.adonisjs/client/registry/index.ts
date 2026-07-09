/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'articles.index': {
    methods: ["GET","HEAD"],
    pattern: '/articles',
    tokens: [{"old":"/articles","type":0,"val":"articles","end":""}],
    types: placeholder as Registry['articles.index']['types'],
  },
  'articles.og': {
    methods: ["GET","HEAD"],
    pattern: '/articles/:slug/og.png',
    tokens: [{"old":"/articles/:slug/og.png","type":0,"val":"articles","end":""},{"old":"/articles/:slug/og.png","type":1,"val":"slug","end":""},{"old":"/articles/:slug/og.png","type":0,"val":"og.png","end":""}],
    types: placeholder as Registry['articles.og']['types'],
  },
  'articles.show': {
    methods: ["GET","HEAD"],
    pattern: '/articles/:slug',
    tokens: [{"old":"/articles/:slug","type":0,"val":"articles","end":""},{"old":"/articles/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['articles.show']['types'],
  },
  'healthz': {
    methods: ["GET","HEAD"],
    pattern: '/healthz',
    tokens: [{"old":"/healthz","type":0,"val":"healthz","end":""}],
    types: placeholder as Registry['healthz']['types'],
  },
  'pages.landing': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['pages.landing']['types'],
  },
  'pages.contact': {
    methods: ["GET","HEAD"],
    pattern: '/contact',
    tokens: [{"old":"/contact","type":0,"val":"contact","end":""}],
    types: placeholder as Registry['pages.contact']['types'],
  },
  'pages.contact.store': {
    methods: ["POST"],
    pattern: '/contact',
    tokens: [{"old":"/contact","type":0,"val":"contact","end":""}],
    types: placeholder as Registry['pages.contact.store']['types'],
  },
  'pages.about': {
    methods: ["GET","HEAD"],
    pattern: '/a-propos',
    tokens: [{"old":"/a-propos","type":0,"val":"a-propos","end":""}],
    types: placeholder as Registry['pages.about']['types'],
  },
  'pages.partners': {
    methods: ["GET","HEAD"],
    pattern: '/partenaires',
    tokens: [{"old":"/partenaires","type":0,"val":"partenaires","end":""}],
    types: placeholder as Registry['pages.partners']['types'],
  },
  'live.status': {
    methods: ["GET","HEAD"],
    pattern: '/live/status',
    tokens: [{"old":"/live/status","type":0,"val":"live","end":""},{"old":"/live/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['live.status']['types'],
  },
  'admin.og.preview': {
    methods: ["GET","HEAD"],
    pattern: '/admin/og/preview',
    tokens: [{"old":"/admin/og/preview","type":0,"val":"admin","end":""},{"old":"/admin/og/preview","type":0,"val":"og","end":""},{"old":"/admin/og/preview","type":0,"val":"preview","end":""}],
    types: placeholder as Registry['admin.og.preview']['types'],
  },
  'admin.articles.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/articles',
    tokens: [{"old":"/admin/articles","type":0,"val":"admin","end":""},{"old":"/admin/articles","type":0,"val":"articles","end":""}],
    types: placeholder as Registry['admin.articles.index']['types'],
  },
  'admin.articles.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/articles/create',
    tokens: [{"old":"/admin/articles/create","type":0,"val":"admin","end":""},{"old":"/admin/articles/create","type":0,"val":"articles","end":""},{"old":"/admin/articles/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.articles.create']['types'],
  },
  'admin.articles.store': {
    methods: ["POST"],
    pattern: '/admin/articles',
    tokens: [{"old":"/admin/articles","type":0,"val":"admin","end":""},{"old":"/admin/articles","type":0,"val":"articles","end":""}],
    types: placeholder as Registry['admin.articles.store']['types'],
  },
  'admin.articles.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/articles/:id/edit',
    tokens: [{"old":"/admin/articles/:id/edit","type":0,"val":"admin","end":""},{"old":"/admin/articles/:id/edit","type":0,"val":"articles","end":""},{"old":"/admin/articles/:id/edit","type":1,"val":"id","end":""},{"old":"/admin/articles/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin.articles.edit']['types'],
  },
  'admin.articles.update': {
    methods: ["PUT"],
    pattern: '/admin/articles/:id',
    tokens: [{"old":"/admin/articles/:id","type":0,"val":"admin","end":""},{"old":"/admin/articles/:id","type":0,"val":"articles","end":""},{"old":"/admin/articles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.articles.update']['types'],
  },
  'admin.pages.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/admin/dashboard',
    tokens: [{"old":"/admin/dashboard","type":0,"val":"admin","end":""},{"old":"/admin/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['admin.pages.dashboard']['types'],
  },
  'admin.redirects.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/redirects',
    tokens: [{"old":"/admin/redirects","type":0,"val":"admin","end":""},{"old":"/admin/redirects","type":0,"val":"redirects","end":""}],
    types: placeholder as Registry['admin.redirects.index']['types'],
  },
  'admin.redirects.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/redirects/create',
    tokens: [{"old":"/admin/redirects/create","type":0,"val":"admin","end":""},{"old":"/admin/redirects/create","type":0,"val":"redirects","end":""},{"old":"/admin/redirects/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.redirects.create']['types'],
  },
  'admin.redirects.store': {
    methods: ["POST"],
    pattern: '/admin/redirects',
    tokens: [{"old":"/admin/redirects","type":0,"val":"admin","end":""},{"old":"/admin/redirects","type":0,"val":"redirects","end":""}],
    types: placeholder as Registry['admin.redirects.store']['types'],
  },
  'admin.redirects.delete': {
    methods: ["DELETE"],
    pattern: '/admin/redirects/:id',
    tokens: [{"old":"/admin/redirects/:id","type":0,"val":"admin","end":""},{"old":"/admin/redirects/:id","type":0,"val":"redirects","end":""},{"old":"/admin/redirects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.redirects.delete']['types'],
  },
  'admin.taxonomies.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/taxonomies',
    tokens: [{"old":"/admin/taxonomies","type":0,"val":"admin","end":""},{"old":"/admin/taxonomies","type":0,"val":"taxonomies","end":""}],
    types: placeholder as Registry['admin.taxonomies.index']['types'],
  },
  'admin.taxonomies.categories.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/taxonomies/categories/create',
    tokens: [{"old":"/admin/taxonomies/categories/create","type":0,"val":"admin","end":""},{"old":"/admin/taxonomies/categories/create","type":0,"val":"taxonomies","end":""},{"old":"/admin/taxonomies/categories/create","type":0,"val":"categories","end":""},{"old":"/admin/taxonomies/categories/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.taxonomies.categories.create']['types'],
  },
  'admin.taxonomies.categories.store': {
    methods: ["POST"],
    pattern: '/admin/taxonomies/categories',
    tokens: [{"old":"/admin/taxonomies/categories","type":0,"val":"admin","end":""},{"old":"/admin/taxonomies/categories","type":0,"val":"taxonomies","end":""},{"old":"/admin/taxonomies/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['admin.taxonomies.categories.store']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.logout': {
    methods: ["DELETE"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'api.assets.store': {
    methods: ["POST"],
    pattern: '/api/assets/images',
    tokens: [{"old":"/api/assets/images","type":0,"val":"api","end":""},{"old":"/api/assets/images","type":0,"val":"assets","end":""},{"old":"/api/assets/images","type":0,"val":"images","end":""}],
    types: placeholder as Registry['api.assets.store']['types'],
  },
  'pastes.create': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['pastes.create']['types'],
  },
  'pastes.store': {
    methods: ["POST"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['pastes.store']['types'],
  },
  'pastes.show': {
    methods: ["GET","HEAD"],
    pattern: '/:id',
    tokens: [{"old":"/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['pastes.show']['types'],
  },
  'process_redirect.execute': {
    methods: ["GET","HEAD"],
    pattern: '/*',
    tokens: [{"old":"/*","type":2,"val":"*","end":""}],
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
