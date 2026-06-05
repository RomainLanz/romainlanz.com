import '@adonisjs/inertia/types'

import type { VNodeProps, AllowedComponentProps, ComponentInstance } from 'vue'

type ExtractProps<T> = Omit<
  ComponentInstance<T>['$props'],
  keyof VNodeProps | keyof AllowedComponentProps
>

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'about': ExtractProps<(typeof import('../../inertia/pages/about.vue'))['default']>
    'admin/articles/create': ExtractProps<(typeof import('../../inertia/pages/admin/articles/create.vue'))['default']>
    'admin/articles/list': ExtractProps<(typeof import('../../inertia/pages/admin/articles/list.vue'))['default']>
    'admin/articles/update': ExtractProps<(typeof import('../../inertia/pages/admin/articles/update.vue'))['default']>
    'admin/pages/dashboard': ExtractProps<(typeof import('../../inertia/pages/admin/pages/dashboard.vue'))['default']>
    'admin/redirects/create': ExtractProps<(typeof import('../../inertia/pages/admin/redirects/create.vue'))['default']>
    'admin/redirects/list': ExtractProps<(typeof import('../../inertia/pages/admin/redirects/list.vue'))['default']>
    'admin/taxonomies/categories/create': ExtractProps<(typeof import('../../inertia/pages/admin/taxonomies/categories/create.vue'))['default']>
    'admin/taxonomies/list': ExtractProps<(typeof import('../../inertia/pages/admin/taxonomies/list.vue'))['default']>
    'articles/list': ExtractProps<(typeof import('../../inertia/pages/articles/list.vue'))['default']>
    'articles/show': ExtractProps<(typeof import('../../inertia/pages/articles/show.vue'))['default']>
    'contact': ExtractProps<(typeof import('../../inertia/pages/contact.vue'))['default']>
    'errors/forbidden': ExtractProps<(typeof import('../../inertia/pages/errors/forbidden.vue'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.vue'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.vue'))['default']>
    'errors/unauthorized': ExtractProps<(typeof import('../../inertia/pages/errors/unauthorized.vue'))['default']>
    'landing': ExtractProps<(typeof import('../../inertia/pages/landing.vue'))['default']>
    'pastes/create': ExtractProps<(typeof import('../../inertia/pages/pastes/create.vue'))['default']>
    'pastes/show': ExtractProps<(typeof import('../../inertia/pages/pastes/show.vue'))['default']>
  }
}
