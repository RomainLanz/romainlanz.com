import { inject } from '@adonisjs/core'
import { NewsletterConfirmation } from '#newsletter/services/newsletter_confirmation'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ConfirmEmailController {
  constructor(private service: NewsletterConfirmation) {}
  async execute({ params, request, response }: HttpContext) {
    if (!request.hasValidSignature()) {
      // TODO: Redirect to an error page saying that the link is invalid
    }

    const subscriptionId = params.id
    await this.service.execute(subscriptionId)

    // TODO: Redirect to a page saying that the email has been confirmed
    return response.redirect().toPath('/')
  }
}
