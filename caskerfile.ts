import {casker} from 'casker';
import {install as installServer, test as testServer, startDev as startServer} from './server/caskerfile';
import {install as installUi, test as testUi, start as startUi} from './ui/caskerfile';
import {install as installBrowserTests, test as testBrowser} from './browser-tests/caskerfile';
import {install as installServiceTests, test as testService} from './service-tests/caskerfile';

const {task, tasksParallel, tasksSeries} = casker({cwd: __dirname});
const installRoot = task('installRoot', 'yarn install');

// Yarn doesn't do well running multiple instances at the same time unless you pass a --mutex flag that just makes sure they don't run in parallel
tasksSeries('install', installServer, installUi, installBrowserTests, installServiceTests, installRoot);
tasksParallel('test', testServer, testUi, testBrowser, testService);
tasksParallel('start', startServer, startUi);
