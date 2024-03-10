import { inject } from '@adonisjs/core'
import { RedirectRepository } from '#redirects/repositories/redirect_repository'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProcessRedirectController {
  constructor(private repository: RedirectRepository) {}

  async handle({ request, response }: HttpContext) {
    const sanitizedUrl = request.url().slice(3)
    const redirect = await this.repository.findByUrl(sanitizedUrl)

    if (!redirect) {
      return response.status(404).send('Not found')
    }

    await this.repository.increaseVisitCount(redirect.id)

    return response.redirect(redirect.to)
  }
}
