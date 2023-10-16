/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const PastesController = () => import('#paste/controllers/pastes_controller')
const AuthController = () => import('#auth/controllers/auth_controller')

router.get('/', async ({ view }) => view.render('pages/home')).as('pages.home')

router.get('pastes/create', [PastesController, 'create']).as('pastes.create')
router.get('pastes/:id', [PastesController, 'show']).as('pastes.show')
router.post('pastes', [PastesController, 'store']).as('pastes.store')

router.get('login', [AuthController, 'showLoginForm']).as('auth.login')
router.post('login', [AuthController, 'login'])
router.delete('logout', [AuthController, 'logout']).as('auth.logout')
