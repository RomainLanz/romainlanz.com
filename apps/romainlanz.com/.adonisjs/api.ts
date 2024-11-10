import type { MakeTuyauRequest, MakeTuyauResponse } from '@tuyau/utils/types'
import type { InferInput } from '@vinejs/vine/types'

type LiveStatusGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/twitch/controllers/get_live_status_controller.ts').default['render']>
}
type AdminDashboardGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/admin/pages/controllers/pages_controller.ts').default['dashboard']>
}
type AdminArticlesGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/admin/articles/controllers/list_articles_controller.ts').default['render']>
}
type AdminArticlesCreateGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/admin/articles/controllers/store_article_controller.ts').default['render']>
}
type AdminArticlesPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/admin/articles/controllers/store_article_controller.ts').default['execute']>
}
type AdminArticlesIdEditGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/admin/articles/controllers/update_article_controller.ts').default['render']>
}
type AdminArticlesIdPut = {
  request: unknown
  response: MakeTuyauResponse<import('../app/admin/articles/controllers/update_article_controller.ts').default['execute']>
}
type AdminRedirectsIdDelete = {
  request: unknown
  response: MakeTuyauResponse<import('../app/redirects/controllers/delete_redirect_controller.ts').default['handle']>
}
type ArticlesGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/articles/controllers/list_articles_controller.ts').default['render']>
}
type ArticlesIdGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/articles/controllers/show_article_controller.ts').default['render']>
}
type ContactGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/pages/controllers/contact_controller.ts').default['render']>
}
type AProposGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/pages/controllers/about_controller.ts').default['render']>
}
type LoginPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/auth/controllers/login_controller.ts').default['execute']>
}
type LogoutDelete = {
  request: unknown
  response: MakeTuyauResponse<import('../app/auth/controllers/logout_controller.ts').default['handle']>
}
type RGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/redirects/controllers/process_redirect_controller.ts').default['handle']>
}
type ApiAssetsImagesPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/media/controllers/upload_image_controller.ts').default['handle']>
}
export interface ApiDefinition {
  'live': {
    'status': {
      '$url': {
      };
      '$get': LiveStatusGetHead;
      '$head': LiveStatusGetHead;
    };
  };
  'admin': {
    'dashboard': {
      '$url': {
      };
      '$get': AdminDashboardGetHead;
      '$head': AdminDashboardGetHead;
    };
    'articles': {
      '$url': {
      };
      '$get': AdminArticlesGetHead;
      '$head': AdminArticlesGetHead;
      'create': {
        '$url': {
        };
        '$get': AdminArticlesCreateGetHead;
        '$head': AdminArticlesCreateGetHead;
      };
      '$post': AdminArticlesPost;
      ':id': {
        'edit': {
          '$url': {
          };
          '$get': AdminArticlesIdEditGetHead;
          '$head': AdminArticlesIdEditGetHead;
        };
        '$url': {
        };
        '$put': AdminArticlesIdPut;
      };
    };
    'redirects': {
      ':id': {
        '$url': {
        };
        '$delete': AdminRedirectsIdDelete;
      };
    };
  };
  'articles': {
    '$url': {
    };
    '$get': ArticlesGetHead;
    '$head': ArticlesGetHead;
    ':slug': {
      '$url': {
      };
      '$get': ArticlesIdGetHead;
      '$head': ArticlesIdGetHead;
    };
  };
  'contact': {
    '$url': {
    };
    '$get': ContactGetHead;
    '$head': ContactGetHead;
  };
  'a-propos': {
    '$url': {
    };
    '$get': AProposGetHead;
    '$head': AProposGetHead;
  };
  'login': {
    '$url': {
    };
    '$post': LoginPost;
  };
  'logout': {
    '$url': {
    };
    '$delete': LogoutDelete;
  };
  'r': {
    '*': {
      '$url': {
      };
      '$get': RGetHead;
      '$head': RGetHead;
    };
  };
  'api': {
    'assets': {
      'images': {
        '$url': {
        };
        '$post': ApiAssetsImagesPost;
      };
    };
  };
}
const routes = [
  {
    params: [],
    name: 'live.status',
    path: '/live/status',
    method: ["GET","HEAD"],
    types: {} as LiveStatusGetHead,
  },
  {
    params: [],
    name: 'admin.pages.dashboard',
    path: '/admin/dashboard',
    method: ["GET","HEAD"],
    types: {} as AdminDashboardGetHead,
  },
  {
    params: [],
    name: 'admin.articles.index',
    path: '/admin/articles',
    method: ["GET","HEAD"],
    types: {} as AdminArticlesGetHead,
  },
  {
    params: [],
    name: 'admin.articles.create',
    path: '/admin/articles/create',
    method: ["GET","HEAD"],
    types: {} as AdminArticlesCreateGetHead,
  },
  {
    params: [],
    name: 'admin.articles.store',
    path: '/admin/articles',
    method: ["POST"],
    types: {} as AdminArticlesPost,
  },
  {
    params: ["id"],
    name: 'admin.articles.edit',
    path: '/admin/articles/:id/edit',
    method: ["GET","HEAD"],
    types: {} as AdminArticlesIdEditGetHead,
  },
  {
    params: ["id"],
    name: 'admin.articles.update',
    path: '/admin/articles/:id',
    method: ["PUT"],
    types: {} as AdminArticlesIdPut,
  },
  {
    params: [],
    name: 'admin.redirects.index',
    path: '/admin/redirects',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'admin.redirects.create',
    path: '/admin/redirects/create',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'admin.redirects.store',
    path: '/admin/redirects',
    method: ["POST"],
    types: {} as unknown,
  },
  {
    params: ["id"],
    name: 'admin.redirects.delete',
    path: '/admin/redirects/:id',
    method: ["DELETE"],
    types: {} as AdminRedirectsIdDelete,
  },
  {
    params: [],
    name: 'pages.landing',
    path: '/',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'articles.index',
    path: '/articles',
    method: ["GET","HEAD"],
    types: {} as ArticlesGetHead,
  },
  {
    params: ["slug"],
    name: 'articles.show',
    path: '/articles/:slug',
    method: ["GET","HEAD"],
    types: {} as ArticlesIdGetHead,
  },
  {
    params: [],
    name: 'pages.contact',
    path: '/contact',
    method: ["GET","HEAD"],
    types: {} as ContactGetHead,
  },
  {
    params: [],
    name: 'pages.about',
    path: '/a-propos',
    method: ["GET","HEAD"],
    types: {} as AProposGetHead,
  },
  {
    params: [],
    name: 'auth.login',
    path: '/login',
    method: ["POST"],
    types: {} as LoginPost,
  },
  {
    params: [],
    name: 'auth.logout',
    path: '/logout',
    method: ["DELETE"],
    types: {} as LogoutDelete,
  },
  {
    params: ["*"],
    name: 'redirects.show',
    path: '/r/*',
    method: ["GET","HEAD"],
    types: {} as RGetHead,
  },
  {
    params: [],
    name: 'api.assets.store',
    path: '/api/assets/images',
    method: ["POST"],
    types: {} as ApiAssetsImagesPost,
  },
] as const;
export const api = {
  routes,
  definition: {} as ApiDefinition
}
declare module '@tuyau/inertia/types' {
  type InertiaApi = typeof api
  export interface Api extends InertiaApi {}
}
