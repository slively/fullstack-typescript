import { destroyClientAndExit, setupConnectionConfig, setupDbClient } from 'database/setup/setup_client';
import { getLogger } from 'logger';

const logger = getLogger();

logger.info(`Creating database ${setupConnectionConfig.database}.`);

setupDbClient.raw(`CREATE DATABASE ${setupConnectionConfig.database}`)
	.then(
		() => logger.info('Database created.'),
		(e: Error) => {
			if (e.message.indexOf('already exists') === -1) {
				logger.error('Could not create database.', e)
			} else {
				logger.info('Database already created.');
			}
		}
	)
	.finally(destroyClientAndExit);
