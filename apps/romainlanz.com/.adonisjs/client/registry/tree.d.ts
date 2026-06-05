/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  live: {
    status: typeof routes['live.status']
  }
  admin: {
    pages: {
      dashboard: typeof routes['admin.pages.dashboard']
    }
    articles: {
      index: typeof routes['admin.articles.index']
      create: typeof routes['admin.articles.create']
      store: typeof routes['admin.articles.store']
      edit: typeof routes['admin.articles.edit']
      update: typeof routes['admin.articles.update']
    }
    redirects: {
      index: typeof routes['admin.redirects.index']
      create: typeof routes['admin.redirects.create']
      store: typeof routes['admin.redirects.store']
      delete: typeof routes['admin.redirects.delete']
    }
    taxonomies: {
      index: typeof routes['admin.taxonomies.index']
      categories: {
        create: typeof routes['admin.taxonomies.categories.create']
        store: typeof routes['admin.taxonomies.categories.store']
      }
    }
  }
  og: {
    compute: typeof routes['og.compute']
  }
  pages: {
    landing: typeof routes['pages.landing']
    contact: typeof routes['pages.contact'] & {
      store: typeof routes['pages.contact.store']
    }
    about: typeof routes['pages.about']
  }
  articles: {
    index: typeof routes['articles.index']
    show: typeof routes['articles.show']
  }
  auth: {
    login: typeof routes['auth.login']
    logout: typeof routes['auth.logout']
  }
  api: {
    assets: {
      store: typeof routes['api.assets.store']
    }
  }
  pastes: {
    create: typeof routes['pastes.create']
    store: typeof routes['pastes.store']
    show: typeof routes['pastes.show']
  }
  processRedirect: {
    execute: typeof routes['process_redirect.execute']
  }
}
