import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as lusca from 'lusca';
import * as expressCluster from 'express-cluster';
import { router } from 'router';
import * as cluster from 'cluster';
import sendPromise from 'lib/middleware/send_promise';
import { errorStatusCodes } from 'lib/middleware/error_status_codes';
import { errorHandler } from 'lib/middleware/error_handler';
import { getConfig } from 'config';
import { getLogger } from 'logger';
import { getDatabaseClient } from 'database/db_client';

const config = getConfig();
const logger = getLogger();
const dbClient = getDatabaseClient();

const runServer = () => {
	const app = express();

	/**
	 * Configure server.
	 */
	app.set('port', config.serverPort)
		.use(compression())
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({ extended: true }))
		.use(lusca.xframe('SAMEORIGIN'))
		.use(lusca.xssProtection(true))
		.use(sendPromise())
		.use(router)
		.use(errorStatusCodes)
		.use(errorHandler);

	/**
	 * Start server.
	 */
	app.listen(
		app.get('port'),
		() => logger.debug(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`)
	);

	const shutdown = () => {
		logger.info('Server received a shutdown signal, closing database connections and shutting down...');
		dbClient.destroy();
		process.exit();
	};

	// this is required to make nodemon && concurrent actually stop the server process
	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
};

if (config.isProduction && cluster.isMaster) {
	logger.info('Running in production, starting a worker per cpu.');
	expressCluster(
		runServer,
		{ count: config.workerCount }
	);
} else {
	runServer();
}
