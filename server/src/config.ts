import * as dotenv from 'dotenv';
import { Config } from 'knex';
import { cpus } from 'os';

export interface ServerConfig {
	isProduction: boolean;
	serverPort: string;
	workerCount: number;
	database: Config;
}

/**
 * Load environment variables from .env file.
 */
export const getConfig = (): ServerConfig => {
	dotenv.config();

	const getEnvString = (name: string): string => process.env[name];
	const getEnvNumber = (name: string): number => parseInt(getEnvString(name), 10);
	const getEnvBoolean = (name: string): boolean => getEnvString(name) === 'true';
	const isProduction = process.env.NODE_ENV === 'production';
	const workerCount = getEnvNumber('WORKER_COUNT') || cpus().length;

	return {
		isProduction,
		serverPort: process.env.SERVER_PORT,
		workerCount,
		database: {
			client: 'pg',
			acquireConnectionTimeout: getEnvNumber('DATABASE_ACQUIRE_CONNECTION_TIMEOUT'),
			connection: {
				debug: getEnvBoolean('DATABASE_DEBUG'),
				host: getEnvString('DATABASE_HOST'),
				user: getEnvString('DATABASE_USER'),
				password: getEnvString('DATABASE_PASSWORD'),
				database: getEnvString('DATABASE_NAME'),
				requestTimeout: getEnvString('DATABASE_REQUEST_TIMEOUT')
			},
			pool: {
				min: getEnvNumber('DATABASE_POOL_MIN'),
				max: getEnvNumber('DATABASE_POOL_MAX')
			},
			migrations: {
				directory: './src/database/migrations',
				tableName: 'migrations'
			}
		}
	}
};
