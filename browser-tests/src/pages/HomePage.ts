
export class HomePage {

	public static get todosLink() { return browser.element('#todos-link a') }

	public static open(): void {
		browser.url('/');
	}
}