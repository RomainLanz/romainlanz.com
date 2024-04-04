import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  assetsBundler: false,

  unstable_assembler: {
    onBuildStarting: [() => import('@adonisjs/vite/build_hook')],

    /**
     * Temporary code to handle HotHook messages
     * Will be moved to @adonisjs/core or @hot-hook/adonis later
     */
    onHttpServerMessage: [
      async () => ({
        default: (ui, message, actions) => {
          if (message.type === 'hot-hook:full-reload') {
            ui.logger.log(
              `${ui.colors.green('full-reload')} due to ${ui.colors.cyan(message.path || message.paths.join(', '))}`
            )
            actions.restartServer()
          }

          if (message.type === 'hot-hook:invalidated') {
            const path = message.path || message.paths[0]

            ui.logger.log(`${ui.colors.yellow('invalidated')} ${ui.colors.cyan(path)}`)
          }
        },
      }),
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Commands
  |--------------------------------------------------------------------------
  |
  | List of ace commands to register from packages. The application commands
  | will be scanned automatically from the "./commands" directory.
  |
  */
  commands: [
    () => import('@adonisjs/core/commands'),
    () => import('@adonisjs/bouncer/commands'),
    () => import('@adonisjs/cache/commands'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Service providers
  |--------------------------------------------------------------------------
  |
  | List of service providers to import and register when booting the
  | application
  |
  */
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    {
      file: () => import('@adonisjs/core/providers/repl_provider'),
      environment: ['repl', 'test'],
    },
    () => import('./providers/app_provider.js'),
    () => import('@adonisjs/core/providers/edge_provider'),
    () => import('@adonisjs/vite/vite_provider'),
    () => import('@adonisjs/session/session_provider'),
    () => import('@adonisjs/shield/shield_provider'),
    () => import('@adonisjs/auth/auth_provider'),
    () => import('@adonisjs/core/providers/vinejs_provider'),
    () => import('@adonisjs/static/static_provider'),
    () => import('@adonisjs/i18n/i18n_provider'),
    () => import('@adonisjs/bouncer/bouncer_provider'),
    () => import('@adonisjs/cache/cache_provider'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Preloads
  |--------------------------------------------------------------------------
  |
  | List of modules to import before starting the application.
  |
  */
  preloads: [
    () => import('#start/routes'),
    () => import('#start/kernel'),
    {
      file: () => import('#start/view'),
      environment: ['web'],
    },
    () => import('#start/events'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Tests
  |--------------------------------------------------------------------------
  |
  | List of test suites to organize tests by their type. Feel free to remove
  | and add additional suites.
  |
  */
  tests: {
    suites: [
      {
        files: ['tests/unit/**/*.spec(.ts|.js)'],
        name: 'unit',
        timeout: 2000,
      },
      {
        files: ['tests/functional/**/*.spec(.ts|.js)'],
        name: 'functional',
        timeout: 30000,
      },
    ],
    forceExit: false,
  },
  metaFiles: [
    {
      pattern: 'public/**',
      reloadServer: false,
    },
    {
      pattern: 'resources/views/**/*.tsx',
      reloadServer: true,
    },
    {
      pattern: 'resources/lang/**/*.{json,yaml,yml}',
      reloadServer: false,
    },
  ],
})
