import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'live.status': { paramsTuple?: []; params?: {} }
    'admin.pages.dashboard': { paramsTuple?: []; params?: {} }
    'admin.og.preview': { paramsTuple?: []; params?: {} }
    'admin.articles.index': { paramsTuple?: []; params?: {} }
    'admin.articles.create': { paramsTuple?: []; params?: {} }
    'admin.articles.store': { paramsTuple?: []; params?: {} }
    'admin.articles.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.articles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.redirects.index': { paramsTuple?: []; params?: {} }
    'admin.redirects.create': { paramsTuple?: []; params?: {} }
    'admin.redirects.store': { paramsTuple?: []; params?: {} }
    'admin.redirects.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.taxonomies.index': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.categories.create': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.categories.store': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.tags.create': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.tags.store': { paramsTuple?: []; params?: {} }
    'pages.landing': { paramsTuple?: []; params?: {} }
    'articles.index': { paramsTuple?: []; params?: {} }
    'articles.og': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'articles.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'pages.contact': { paramsTuple?: []; params?: {} }
    'pages.contact.store': { paramsTuple?: []; params?: {} }
    'pages.about': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'api.assets.store': { paramsTuple?: []; params?: {} }
    'pastes.create': { paramsTuple?: []; params?: {} }
    'pastes.store': { paramsTuple?: []; params?: {} }
    'pastes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'process_redirect.execute': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
  }
  GET: {
    'live.status': { paramsTuple?: []; params?: {} }
    'admin.pages.dashboard': { paramsTuple?: []; params?: {} }
    'admin.og.preview': { paramsTuple?: []; params?: {} }
    'admin.articles.index': { paramsTuple?: []; params?: {} }
    'admin.articles.create': { paramsTuple?: []; params?: {} }
    'admin.articles.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.redirects.index': { paramsTuple?: []; params?: {} }
    'admin.redirects.create': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.index': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.categories.create': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.tags.create': { paramsTuple?: []; params?: {} }
    'pages.landing': { paramsTuple?: []; params?: {} }
    'articles.index': { paramsTuple?: []; params?: {} }
    'articles.og': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'articles.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'pages.contact': { paramsTuple?: []; params?: {} }
    'pages.about': { paramsTuple?: []; params?: {} }
    'pastes.create': { paramsTuple?: []; params?: {} }
    'pastes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'process_redirect.execute': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
  }
  HEAD: {
    'live.status': { paramsTuple?: []; params?: {} }
    'admin.pages.dashboard': { paramsTuple?: []; params?: {} }
    'admin.og.preview': { paramsTuple?: []; params?: {} }
    'admin.articles.index': { paramsTuple?: []; params?: {} }
    'admin.articles.create': { paramsTuple?: []; params?: {} }
    'admin.articles.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.redirects.index': { paramsTuple?: []; params?: {} }
    'admin.redirects.create': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.index': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.categories.create': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.tags.create': { paramsTuple?: []; params?: {} }
    'pages.landing': { paramsTuple?: []; params?: {} }
    'articles.index': { paramsTuple?: []; params?: {} }
    'articles.og': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'articles.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'pages.contact': { paramsTuple?: []; params?: {} }
    'pages.about': { paramsTuple?: []; params?: {} }
    'pastes.create': { paramsTuple?: []; params?: {} }
    'pastes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'process_redirect.execute': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
  }
  POST: {
    'admin.articles.store': { paramsTuple?: []; params?: {} }
    'admin.redirects.store': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.categories.store': { paramsTuple?: []; params?: {} }
    'admin.taxonomies.tags.store': { paramsTuple?: []; params?: {} }
    'pages.contact.store': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'api.assets.store': { paramsTuple?: []; params?: {} }
    'pastes.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'admin.articles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'admin.redirects.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.logout': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}