/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'articles.index': {
    methods: ["GET","HEAD"]
    pattern: '/articles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/articles/controllers/list_articles_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/articles/controllers/list_articles_controller').default['render']>>>
    }
  }
  'articles.og': {
    methods: ["GET","HEAD"]
    pattern: '/articles/:slug/og.png'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/articles/controllers/show_article_og_image_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/articles/controllers/show_article_og_image_controller').default['render']>>>
    }
  }
  'articles.show': {
    methods: ["GET","HEAD"]
    pattern: '/articles/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/articles/controllers/show_article_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/articles/controllers/show_article_controller').default['render']>>>
    }
  }
  'pages.landing': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/pages/controllers/landing_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pages/controllers/landing_controller').default['render']>>>
    }
  }
  'pages.contact': {
    methods: ["GET","HEAD"]
    pattern: '/contact'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/pages/controllers/contact_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pages/controllers/contact_controller').default['render']>>>
    }
  }
  'pages.contact.store': {
    methods: ["POST"]
    pattern: '/contact'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/pages/controllers/contact_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/pages/controllers/contact_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/pages/controllers/contact_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pages/controllers/contact_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'pages.about': {
    methods: ["GET","HEAD"]
    pattern: '/a-propos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/pages/controllers/about_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pages/controllers/about_controller').default['render']>>>
    }
  }
  'live.status': {
    methods: ["GET","HEAD"]
    pattern: '/live/status'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/twitch/controllers/get_live_status_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/twitch/controllers/get_live_status_controller').default['render']>>>
    }
  }
  'admin.og.preview': {
    methods: ["GET","HEAD"]
    pattern: '/admin/og/preview'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#app/admin/articles/controllers/preview_og_image_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/preview_og_image_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/preview_og_image_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.articles.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/articles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/list_articles_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/list_articles_controller').default['render']>>>
    }
  }
  'admin.articles.create': {
    methods: ["GET","HEAD"]
    pattern: '/admin/articles/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/store_article_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/store_article_controller').default['render']>>>
    }
  }
  'admin.articles.store': {
    methods: ["POST"]
    pattern: '/admin/articles'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/admin/articles/controllers/store_article_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/admin/articles/controllers/store_article_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/store_article_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/store_article_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.articles.edit': {
    methods: ["GET","HEAD"]
    pattern: '/admin/articles/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/update_article_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/update_article_controller').default['render']>>>
    }
  }
  'admin.articles.update': {
    methods: ["PUT"]
    pattern: '/admin/articles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/admin/articles/controllers/update_article_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/admin/articles/controllers/update_article_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/update_article_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/articles/controllers/update_article_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.pages.dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/admin/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/pages/controllers/pages_controller').default['dashboard']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/pages/controllers/pages_controller').default['dashboard']>>>
    }
  }
  'admin.redirects.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/redirects'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/redirects/controllers/list_redirects_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/redirects/controllers/list_redirects_controller').default['render']>>>
    }
  }
  'admin.redirects.create': {
    methods: ["GET","HEAD"]
    pattern: '/admin/redirects/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/redirects/controllers/store_redirect_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/redirects/controllers/store_redirect_controller').default['render']>>>
    }
  }
  'admin.redirects.store': {
    methods: ["POST"]
    pattern: '/admin/redirects'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/admin/redirects/controllers/store_redirect_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/admin/redirects/controllers/store_redirect_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/redirects/controllers/store_redirect_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/redirects/controllers/store_redirect_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.redirects.delete': {
    methods: ["DELETE"]
    pattern: '/admin/redirects/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/redirects/controllers/delete_redirect_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/redirects/controllers/delete_redirect_controller').default['execute']>>>
    }
  }
  'admin.taxonomies.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/taxonomies'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/taxonomies/controllers/list_taxonomies_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/taxonomies/controllers/list_taxonomies_controller').default['render']>>>
    }
  }
  'admin.taxonomies.categories.create': {
    methods: ["GET","HEAD"]
    pattern: '/admin/taxonomies/categories/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/taxonomies/controllers/store_category_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/taxonomies/controllers/store_category_controller').default['render']>>>
    }
  }
  'admin.taxonomies.categories.store': {
    methods: ["POST"]
    pattern: '/admin/taxonomies/categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/admin/taxonomies/controllers/store_category_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/admin/taxonomies/controllers/store_category_controller').default['execute']>>>
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/auth/controllers/login_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/auth/controllers/login_controller').default['execute']>>>
    }
  }
  'auth.logout': {
    methods: ["DELETE"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/auth/controllers/logout_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/auth/controllers/logout_controller').default['handle']>>>
    }
  }
  'api.assets.store': {
    methods: ["POST"]
    pattern: '/api/assets/images'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/media/controllers/upload_image_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/media/controllers/upload_image_controller').default['handle']>>>
    }
  }
  'pastes.create': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/paste/controllers/store_paste_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/paste/controllers/store_paste_controller').default['render']>>>
    }
  }
  'pastes.store': {
    methods: ["POST"]
    pattern: '/'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/paste/controllers/store_paste_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/paste/controllers/store_paste_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/paste/controllers/store_paste_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/paste/controllers/store_paste_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'pastes.show': {
    methods: ["GET","HEAD"]
    pattern: '/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/paste/controllers/show_paste_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/paste/controllers/show_paste_controller').default['render']>>>
    }
  }
  'process_redirect.execute': {
    methods: ["GET","HEAD"]
    pattern: '/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/redirects/controllers/process_redirect_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/redirects/controllers/process_redirect_controller').default['execute']>>>
    }
  }
}
