/**
 * A middleware to allow sending a promise directly with the express Response object.
 * Errors are forwarded to next middleware.
 */
import { NextFunction, Request, Response } from 'express';

const sendPromise = () => (req: Request, res: Response, next: NextFunction) => {
	res.sendPromise = (promise: PromiseLike<any>) => {
		promise.then(
			(item: any) => res.json(item),
			(err: Error) => {
				next(err);
			}
		);
	};

	next();
};

export default sendPromise;
