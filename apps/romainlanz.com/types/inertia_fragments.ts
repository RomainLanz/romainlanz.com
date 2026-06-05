import '@adonisjs/inertia/types';

declare module '@adonisjs/inertia/types' {
	export interface InertiaPages {
		'twitch/live_status': { isLive: boolean };
	}
}
