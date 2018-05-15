declare namespace Express {
	interface Response {
		sendPromise: (p: PromiseLike<any>) => void
	}
}
