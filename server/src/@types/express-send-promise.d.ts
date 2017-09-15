declare namespace Express {
	interface Response {
		sendPromise: (p: Promise<any>) => void
	}
}
