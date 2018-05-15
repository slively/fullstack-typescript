import axios from 'axios';

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_DELAY = 1000;

export const BACKEND_SERVER_URL = 'http://localhost:8080/health';
export const FRONTEND_SERVER_URL = 'http://localhost:3000';

export const waitForServer = (url, timeout = DEFAULT_TIMEOUT, delay = DEFAULT_DELAY) => {
	const startTime = Date.now();

	console.log(`Polling server at url: ${url}`);

	return axios.get(url)
		.catch((err: Error) => {
			const hasTimedOut = Date.now() - startTime > timeout;

			if (hasTimedOut) {
				console.error(`Timed out waiting for server at url: ${url}`);
				throw new Error(err.message);
			} else {
				setTimeout(fetch, delay);
			}
		});
};


