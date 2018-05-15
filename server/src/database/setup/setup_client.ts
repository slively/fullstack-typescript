import * as Knex from 'knex';
import { ConnectionConfig } from 'knex';
import { getConfig } from 'config';

const config = getConfig();

// Connect to default postgres database in order to create/drop the database.
export const setupConnectionConfig = config.database.connection as ConnectionConfig;
export const setupDbClient = Knex({
	...config.database,
	connection: {
		...setupConnectionConfig,
		database: 'postgres'
	}
});
export const destroyClientAndExit = () => setupDbClient.destroy().finally(() => process.exit());
