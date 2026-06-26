import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

const {
	auth: { Login: LoginController, Logout: LogoutController },
} = controllers;

router
	.group(() => {
		router.post('login', [LoginController, 'execute']).as('auth.login');
	})
	.middleware(middleware.guest());

router.delete('logout', [LogoutController]).as('auth.logout');
