import { UserRole } from '#auth/enums/user_role'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

export default class AssetsController {
  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.role !== UserRole.Admin) {
      return response.forbidden()
    }

    // TODO: Refactor once AdonisJS Drive is migrated
    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif', 'jpeg'],
    })

    if (!image) {
      return response.badRequest({ errors: [{ message: 'Image is required' }] })
    }

    if (!image.isValid) {
      return response.badRequest({ errors: image.errors })
    }

    const fileName = `${cuid()}.${image.extname}`

    await image.move(app.makePath('public/uploads'), {
      name: fileName,
    })

    return response.ok({ data: { filePath: `uploads/${fileName}` } })
  }
}