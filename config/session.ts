import env from '#start/env'
import { defineConfig } from '@adonisjs/session'

export default defineConfig({
  enabled: true,
  cookieName: 'adonis-session',

  /**
   * When set to true, the session id cookie will be deleted
   * once the user closes the browser.
   */
  clearWithBrowser: false,

  /**
   * Define how long to keep the session data alive without
   * any activity.
   */
  age: '2h',

  /**
   * The driver to use. Make sure to validate the environment
   * variable in order to infer the driver name without any
   * errors.
   */
  driver: env.get('SESSION_DRIVER'),

  cookie: {
    path: '/',
    httpOnly: true,
    sameSite: false,
  },

  /**
   * Settings for the file driver
   */
  // file: {
  //   location: app.tmpPath('sessions'),
  // },

  /**
   * Settings for the redis driver
   */
  // redis: {
  //   connection: 'main'
  // },
})