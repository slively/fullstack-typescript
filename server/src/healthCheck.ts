import {Request, RequestHandler, Response} from 'express';
import {dbClient} from 'database/dbClient';

// A health check that verifies the database connection is still working
export const healthCheck: RequestHandler = (req: Request, res: Response) => {
	dbClient.raw('SELECT 1 = 1').then(
		() => res.status(200).end(),
		() => res.status(500).end()
	);
};
