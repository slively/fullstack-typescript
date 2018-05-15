import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

// This middleware is meant to handle error types and set the appropriate status code
export function errorStatusCodes(err: Error, req: Request, res: Response, next: NextFunction) {

	if (err instanceof Array && err[0] instanceof ValidationError) {
		res.status(422);
	}

	next(err);
}
