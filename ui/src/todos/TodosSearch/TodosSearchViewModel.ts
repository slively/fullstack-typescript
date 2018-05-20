import { RouterStore } from 'routing/RouterStore';
import { computed, action } from 'mobx';

export class TodosSearchViewModel {

	public static getInstance() {
		return this._instance || (this._instance = new TodosSearchViewModel())
	}

	private static _instance: TodosSearchViewModel;

	constructor(
		private routerStore: RouterStore = RouterStore.getInstance()
	) { }

	@computed
	get searchText(): string {
		if (this.routerStore.route == null) {
			return '';
		}

		return this.routerStore.route.params.search || '';
	};

	@action.bound
	setSearchText(text: string): void {
		if (this.routerStore.route == null) {
			return;
		}

		const search = (text != null && text.length > 0) ? text : null;

		this.routerStore.router.navigate(this.routerStore.route.name, { search }, { replace: true, reload: true })
	};
}
