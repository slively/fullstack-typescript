import * as errorHandlerMiddleware from 'errorhandler';
import { getLogger } from 'logger';

export const errorHandler = () => {
	const logger = getLogger();

	const logError = (err: any) => logger.error(err.stack ? err.stack.toString() : err.message || `${err.constructor.name}: ${JSON.stringify(err)}`);

	errorHandlerMiddleware({
		log: (err: any | any[]) => {
			err instanceof Array ? err.forEach(logError) : logError(err);
		}
	})
}
