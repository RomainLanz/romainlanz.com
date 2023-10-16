import shiki from 'shiki'
import Paste from '#paste/models/paste'
import type { HttpContext } from '@adonisjs/core/http'

export default class PastesController {
  async show({ params, view }: HttpContext) {
    const paste = await Paste.findOrFail(params.id)

    return view.render('pages/pastes/show', { paste })
  }

  create({ view }: HttpContext) {
    return view.render('pages/pastes/create')
  }

  async store({ request, response }: HttpContext) {
    const content = request.input('content')

    const ghl = await shiki.getHighlighter({
      theme: 'github-light',
    })

    const code = ghl.codeToHtml(content, { lang: 'ts' })

    const paste = await Paste.create({
      content: code,
    })

    return response.redirect().toRoute('pastes.show', [paste.id])
  }
}
