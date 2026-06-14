import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';

const {
	twitch: { GetLiveStatus: GetLiveStatusController },
} = controllers;

router.get('/live/status', [GetLiveStatusController, 'render']).as('live.status');
