import { Exception } from '@adonisjs/core/exceptions';

export class RecordNotFoundException extends Exception {
	static status = 404;
	static code = 'E_RECORD_NOT_FOUND';
	static message = 'The requested record was not found in the database';
}
