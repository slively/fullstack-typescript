import {casker} from 'casker';
import {install as installServer, test as testServer, startDev as startServer} from './server/caskerfile';
import {install as installUi, test as testUi, start as startUi} from './ui/caskerfile';
import {install as installBrowserTests, test as testBrowser} from './browser-tests/caskerfile';
import {install as installServiceTests, test as testService} from './service-tests/caskerfile';

const {tasksParallel} = casker({cwd: __dirname});

tasksParallel('install', installServer, installUi, installBrowserTests, installServiceTests);
tasksParallel('test', testServer, testUi, testBrowser, testService);
tasksParallel('start', startServer, startUi);
