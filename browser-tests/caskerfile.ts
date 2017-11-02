import {casker} from 'casker';
import {waitForBrowserTestsServer} from '../server/caskerfile';

const {task, tasksParallel} = casker({namespace: 'browser-tests', cwd: __dirname});

export const install = task('install', 'yarn install');
export const compile = task('compile', 'tsc', {dependsOn: install});
export const test = task(
	'test',
	'wdio',
	{
		dependsOn: tasksParallel('testSetup', compile, waitForBrowserTestsServer)
	}
);
