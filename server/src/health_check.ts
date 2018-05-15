import { Request, RequestHandler, Response } from 'express';
import { getDatabaseClient } from 'database/db_client';

const dbClient = getDatabaseClient();
// A health check that verifies the database connection is still working
export const healthCheck: RequestHandler = (req: Request, res: Response) => {
	res.sendPromise(dbClient.raw('SELECT 1 = 1'));
};
