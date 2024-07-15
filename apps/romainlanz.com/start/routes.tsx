import './routes/admin.js'
import './routes/app.js'
import './routes/partials.js'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// region Controller's Imports
const ProcessRedirectController = () => import('#redirects/controllers/process_redirect_controller')
const UploadImageController = () => import('#media/controllers/upload_image_controller')
// endregion

router.get('r/*', [ProcessRedirectController]).as('redirects.show')

router
  .group(() => {
    router.post('assets/images', [UploadImageController]).as('assets.store')
  })
  .prefix('api')
  .as('api')
  .middleware([middleware.auth()])

// router.get('pastes/create', [PastesController, 'create']).as('pastes.create')
// router.get('pastes/:id', [PastesController, 'show']).as('pastes.show')
// router.post('pastes', [PastesController, 'store']).as('pastes.store')
