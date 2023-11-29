import Redirect from '../models/redirect.js'
import { RedirectView } from '#views/pages/admin/redirects/redirects'
import type { HttpContext } from '@adonisjs/core/http'
import { storeRedirectValidator } from '#redirects/validators/redirect_validator'

export default class RedirectsController {
  async index() {
    const redirects = await Redirect.all()

    return <RedirectView.Index redirects={redirects} />
  }

  create() {
    return <RedirectView.Create />
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(storeRedirectValidator)

    await Redirect.create(payload)

    return response.redirect().toRoute('admin.redirects.index')
  }

  async show({ params, response }: HttpContext) {
    const redirect = await Redirect.findByOrFail('url', params.url)

    return response.redirect(redirect.to)
  }
}
