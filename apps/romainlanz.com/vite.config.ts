import AdonisJS from '@adonisjs/vite/client'
import UnoCSS from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import inertia from '@adonisjs/inertia/client'
import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.ts' } }),
    Vue(),
    AdonisJS({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] }),
    UnoCSS(),
  ],

  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
    },
  },
})
