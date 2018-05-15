import { runYarnCommand, killAll, kill } from './run_yarn_command';
import { waitForServer, BACKEND_SERVER_URL, FRONTEND_SERVER_URL } from './wait_for_server_start';

const client = runYarnCommand('start:ui');
const server = runYarnCommand('start:serverForTest');

Promise.all([
	waitForServer(BACKEND_SERVER_URL),
	waitForServer(FRONTEND_SERVER_URL)
])
	.then(
		() => {
			runYarnCommand('start:browserTests').on('exit', code => {
				process.exitCode = code; // success of this script depends on the success of the tests
				kill(client);
				kill(server);
				runYarnCommand('server:dropDatabase');
			});
		},
		() => {
			process.exitCode = 1;
			killAll()
		}
	);

