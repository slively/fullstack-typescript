import * as errorHandlerMiddleware from 'errorhandler';
import {logger} from 'logger';

const logError = (err: any) => logger.error(err.stack ? err.stack.toString() : err.message || `${err.constructor.name}: ${JSON.stringify(err)}`);

export const errorHandler = errorHandlerMiddleware({
		log: (err: any | any[]) => {
			err instanceof Array ? err.forEach(logError) : logError(err);
		}
	});
