import app from '@adonisjs/core/services/app'
import string from '@adonisjs/core/helpers/string'
import logger from '@adonisjs/core/services/logger'
import emitter from '@adonisjs/core/services/emitter'

const blacklistedUrls = ['/node_modules', '/resources', '/@']

emitter.on('http:request_completed', function ({ ctx, duration }) {
  if (blacklistedUrls.some((url) => ctx.request.url().startsWith(url))) {
    return
  }

  if (!app.inDev) {
    return
  }

  logger.info(
    `[HTTP] ${ctx.response.getStatus()} - ${ctx.request.method()} ${ctx.request.url()} - ${string.prettyHrTime(duration)}`
  )
})
