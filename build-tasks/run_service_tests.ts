import { runYarnCommand } from './run_yarn_command';
import { BACKEND_SERVER_URL, waitForServer } from './wait_for_server_start';
const treeKill = require('tree-kill');

const server = runYarnCommand('start:serverForTest');

waitForServer(BACKEND_SERVER_URL).then(() => {
	runYarnCommand('start:serviceTests').on('exit', code => {
		process.exitCode = code; // success of this script depends on the success of the tests
		treeKill(server.pid);
		runYarnCommand('server:dropDatabase');
	});
});
