import { defineConfig } from '@adonisjs/shield'

export default defineConfig({
  /**
   * Configure CSP policies for your app. Refer documentation
   * to learn more
   */
  csp: {
    enabled: false,
    directives: {},
    reportOnly: false,
  },

  /**
   * Configure CSRF protection options. Refer documentation
   * to learn more
   */
  csrf: {
    enabled: true,
    exceptRoutes: (ctx) => ctx.request.url().includes('/api/'),
    enableXsrfCookie: false,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },

  /**
   * Control how your website should be embedded inside
   * iFrames
   */
  xFrame: {
    enabled: true,
    action: 'DENY',
  },

  /**
   * Force browser to always use HTTPS
   */
  hsts: {
    enabled: true,
    maxAge: '180 days',
  },

  /**
   * Disable browsers from sniffing the content type of a
   * response and always rely on the "content-type" header.
   */
  contentTypeSniffing: {
    enabled: true,
  },
})
