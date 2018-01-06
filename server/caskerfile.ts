import {casker} from 'casker';
import {build as buildUI, buildOutputPath as buildUIOutputPath} from '../ui/caskerfile';

const {task, tasksSeries} = casker({namespace: 'server', cwd: __dirname});
const buildDist = 'build/dist';

export const clean = task('clean', 'rm -rf ./build');
export const install = task('install', 'yarn install');
export const test = task('test', 'jest --forceExit --config=jest.config.json --coverage', {dependsOn: install});
export const compile = task('compile', 'tsc', {dependsOn: install});

/**
 * dev server tasks
 */
const createDatabase = task('createDatabase', 'ts-node -r tsconfig-paths/register ./src/database/setup/createDatabase');
const migrateDatabase = task('migrateDatabase', 'knex migrate:latest', {dependsOn: createDatabase});
task('dropDatabase', 'ts-node -r tsconfig-paths/register ./src/database/setup/dropDatabase');
task('createMigration', 'knex migrate:make');
export const startDev = task('start', 'nodemon', {dependsOn: migrateDatabase, streamLogs: true});

/**
 * production build tasks
 */
const copyUIFiles = task('copyUIFiles', `ncp ${buildUIOutputPath} ${buildDist}/ui`, {dependsOn: buildUI});
const cleanNodeModules = task('cleanNodeModules', 'rm -rf node_modules');
export const installProd = task(
	'installProd',
	`yarn install --production --ignore-scripts --prefer-offline --modules-folder ${buildDist}/node_modules`,
	{
		dependsOn: cleanNodeModules,
		onExit: install // restore dev dependencies
	}
);
export const copyProdFiles = task(
	'copyProdFiles',
	`copyfiles .env package.json ${buildDist}`,
	{
		dependsOn: installProd
	}
);
export const build = tasksSeries('build', compile, test, copyUIFiles, copyProdFiles, installProd);

const createTasksForProductionServer = (databaseName: string, port: number, suffix: string) => {
	const prodNodePath = `NODE_PATH=${buildDist}/src`;
	const createProdDatabase = task(
		`createProdDatabase${suffix}`,
		`DATABASE_NAME=${databaseName} ${prodNodePath} node ${buildDist}/src/database/setup/createDatabase`,
		{dependsOn: build}
	);
	const migrateProdDatabase = task(
		`migrateProdDatabase${suffix}`,
		`cd ${buildDist} && DATABASE_NAME=${databaseName} ${prodNodePath} knex migrate:latest`,
		{dependsOn: createProdDatabase}
	);
	const dropProdDatabase = task(
		`dropProdDatabase${suffix}`,
		`DATABASE_NAME=${databaseName} ${prodNodePath} node ${buildDist}/src/database/setup/dropDatabase`
	);
	const startProdServerCmd = `DATABASE_NAME=${databaseName} ${prodNodePath} SERVER_PORT=${port} node ${buildDist}/src/server`;
	const startProdServerOptions = {dependsOn: migrateProdDatabase, onExit: dropProdDatabase};
	const startProdServerBackground = task(
		`startProdBackground${suffix}`,
		startProdServerCmd,
		{...startProdServerOptions, runInBackground: true}
	);
	const startProdServer = task(
		`startProd${suffix}`,
		startProdServerCmd,
		startProdServerOptions
	);
	const waitForBackgroundProdServer = task(
		`waitForProdServer${suffix}`,
		`wait-on -t 10000 http://localhost:${port}/health`,
		{dependsOn: startProdServerBackground}
	);

	return {startProdServer, waitForBackgroundProdServer}
};

/**
 * Tasks to run a production server for testing
 */
createTasksForProductionServer('fullstack_typescript_prod', 8080, '');
const {waitForBackgroundProdServer: waitForBrowserTestsServer} = createTasksForProductionServer('fullstack_typescript_browser_tests', 8081, 'ForBrowserTests');
const {waitForBackgroundProdServer: waitForServiceTestsServer} = createTasksForProductionServer('fullstack_typescript_service_tests', 8082, 'ForServiceTests');

export {waitForBrowserTestsServer, waitForServiceTestsServer};
