import type { MakeTuyauRequest, MakeTuyauResponse } from '@tuyau/utils/types'
import type { InferInput } from '@vinejs/vine/types'

type AdminRedirectsIdDelete = {
  request: unknown
  response: MakeTuyauResponse<import('../app/redirects/controllers/delete_redirect_controller.ts').default['handle']>
}
type NewslettersIdConfirmGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/newsletter/controllers/confirm_email_controller.ts').default['execute']>
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
  'admin': {
    'redirects': {
      ':id': {
        '$url': {
        };
        '$delete': AdminRedirectsIdDelete;
      };
    };
  };
  'newsletters': {
    ':id': {
      'confirm': {
        '$url': {
        };
        '$get': NewslettersIdConfirmGetHead;
        '$head': NewslettersIdConfirmGetHead;
      };
    };
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
    types: {} as unknown,
  },
  {
    params: [],
    name: 'admin.pages.dashboard',
    path: '/admin/dashboard',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'admin.articles.index',
    path: '/admin/articles',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'admin.articles.create',
    path: '/admin/articles/create',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'admin.articles.store',
    path: '/admin/articles',
    method: ["POST"],
    types: {} as unknown,
  },
  {
    params: ["id"],
    name: 'admin.articles.edit',
    path: '/admin/articles/:id/edit',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: ["id"],
    name: 'admin.articles.update',
    path: '/admin/articles/:id',
    method: ["PUT"],
    types: {} as unknown,
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
    types: {} as unknown,
  },
  {
    params: ["slug"],
    name: 'articles.show',
    path: '/articles/:slug',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'newsletters.register',
    path: '/newsletters/register',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'newsletters.store',
    path: '/newsletters/register',
    method: ["POST"],
    types: {} as unknown,
  },
  {
    params: ["id"],
    name: 'newsletters.confirm',
    path: '/newsletters/:id/confirm',
    method: ["GET","HEAD"],
    types: {} as NewslettersIdConfirmGetHead,
  },
  {
    params: [],
    name: 'auth.login',
    path: '/login',
    method: ["GET","HEAD"],
    types: {} as unknown,
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
