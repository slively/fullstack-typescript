import {casker} from 'casker';
import {waitForServiceTestsServer} from '../server/caskerfile';

const {task} = casker({namespace: 'service-tests', cwd: __dirname});

export const install = task('install', 'yarn install');
export const test = task(
	'test',
	'DEBUG=super-debug,super-curl jest --config=jest.config.json',
	{
		dependsOn: waitForServiceTestsServer
	}
);
