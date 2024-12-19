import logger from '@adonisjs/core/services/logger';
import { DeferQueue } from '@poppinss/defer';

import.meta.hot?.decline();

export const defer = new DeferQueue();

defer.onError = (error) => {
	logger.error(error);
};
