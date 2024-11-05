import router from '@adonisjs/core/services/router';

// region Controller's Imports
const GetLiveStatusController = () => import('#twitch/controllers/get_live_status_controller');
// endregion

router.get('/live/status', [GetLiveStatusController, 'render']).as('live.status');
