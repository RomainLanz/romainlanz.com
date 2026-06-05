/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'live.status': {
    methods: ["GET","HEAD"]
    pattern: '/live/status'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#twitch/controllers/get_live_status_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#twitch/controllers/get_live_status_controller').default['render']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#admin/pages/controllers/pages_controller').default['dashboard']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/pages/controllers/pages_controller').default['dashboard']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#admin/articles/controllers/list_articles_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/articles/controllers/list_articles_controller').default['render']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#admin/articles/controllers/store_article_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/articles/controllers/store_article_controller').default['render']>>>
    }
  }
  'admin.articles.store': {
    methods: ["POST"]
    pattern: '/admin/articles'
    types: {
      body: ExtractBody<InferInput<(typeof import('#admin/articles/controllers/store_article_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#admin/articles/controllers/store_article_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#admin/articles/controllers/store_article_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/articles/controllers/store_article_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      response: ExtractResponse<Awaited<ReturnType<import('#admin/articles/controllers/update_article_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/articles/controllers/update_article_controller').default['render']>>>
    }
  }
  'admin.articles.update': {
    methods: ["PUT"]
    pattern: '/admin/articles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#admin/articles/controllers/update_article_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#admin/articles/controllers/update_article_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#admin/articles/controllers/update_article_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/articles/controllers/update_article_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      response: ExtractResponse<Awaited<ReturnType<import('#admin/redirects/controllers/list_redirects_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/redirects/controllers/list_redirects_controller').default['render']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#admin/redirects/controllers/store_redirect_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/redirects/controllers/store_redirect_controller').default['render']>>>
    }
  }
  'admin.redirects.store': {
    methods: ["POST"]
    pattern: '/admin/redirects'
    types: {
      body: ExtractBody<InferInput<(typeof import('#admin/redirects/controllers/store_redirect_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#admin/redirects/controllers/store_redirect_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#admin/redirects/controllers/store_redirect_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/redirects/controllers/store_redirect_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      response: ExtractResponse<Awaited<ReturnType<import('#admin/redirects/controllers/delete_redirect_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/redirects/controllers/delete_redirect_controller').default['execute']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#admin/taxonomies/controllers/list_taxonomies_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/taxonomies/controllers/list_taxonomies_controller').default['render']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#admin/taxonomies/controllers/store_category_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/taxonomies/controllers/store_category_controller').default['render']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#admin/taxonomies/controllers/store_category_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#admin/taxonomies/controllers/store_category_controller').default['execute']>>>
    }
  }
  'og.compute': {
    methods: ["GET","HEAD"]
    pattern: '/og/compute'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#common/controllers/compute_og_image_controllers').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#common/controllers/compute_og_image_controllers').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#common/controllers/compute_og_image_controllers').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      response: ExtractResponse<Awaited<ReturnType<import('#pages/controllers/landing_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#pages/controllers/landing_controller').default['render']>>>
    }
  }
  'articles.index': {
    methods: ["GET","HEAD"]
    pattern: '/articles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#articles/controllers/list_articles_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#articles/controllers/list_articles_controller').default['render']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#articles/controllers/show_article_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#articles/controllers/show_article_controller').default['render']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#pages/controllers/contact_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#pages/controllers/contact_controller').default['render']>>>
    }
  }
  'pages.contact.store': {
    methods: ["POST"]
    pattern: '/contact'
    types: {
      body: ExtractBody<InferInput<(typeof import('#pages/controllers/contact_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#pages/controllers/contact_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#pages/controllers/contact_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#pages/controllers/contact_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      response: ExtractResponse<Awaited<ReturnType<import('#pages/controllers/about_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#pages/controllers/about_controller').default['render']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/login_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/login_controller').default['execute']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/logout_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/logout_controller').default['handle']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#media/controllers/upload_image_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#media/controllers/upload_image_controller').default['handle']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#paste/controllers/store_paste_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#paste/controllers/store_paste_controller').default['render']>>>
    }
  }
  'pastes.store': {
    methods: ["POST"]
    pattern: '/'
    types: {
      body: ExtractBody<InferInput<(typeof import('#paste/controllers/store_paste_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#paste/controllers/store_paste_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#paste/controllers/store_paste_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#paste/controllers/store_paste_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      response: ExtractResponse<Awaited<ReturnType<import('#paste/controllers/show_paste_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#paste/controllers/show_paste_controller').default['render']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#redirects/controllers/process_redirect_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#redirects/controllers/process_redirect_controller').default['execute']>>>
    }
  }
}
