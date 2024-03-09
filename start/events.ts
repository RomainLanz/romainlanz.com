import string from '@adonisjs/core/helpers/string'
import logger from '@adonisjs/core/services/logger'
import emitter from '@adonisjs/core/services/emitter'

emitter.on('http:request_completed', function ({ ctx, duration }) {
  logger.info(
    `[HTTP] ${ctx.response.getStatus()} - ${ctx.request.method()} ${ctx.request.url()} - ${string.prettyHrTime(duration)}`
  )
})
