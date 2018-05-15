import {destroyClientAndExit, setupConnectionConfig, setupDbClient} from 'database/setup/setup_client';
import { getLogger } from 'logger';

const logger = getLogger();

logger.info(`Dropping database ${setupConnectionConfig.database}.`);

setupDbClient.raw(`DROP DATABASE ${setupConnectionConfig.database}`)
	.then(
		() => logger.info('Database dropped.'),
		(e: Error) => {
			if (e.message.indexOf('does not exist') === -1) {
				logger.error('Could not drop database.', e)
			} else {
				logger.info('Database already dropped.');
			}
		}
	)
	.finally(destroyClientAndExit);
