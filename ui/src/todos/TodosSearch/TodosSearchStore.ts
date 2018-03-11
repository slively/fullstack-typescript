import {routerStore, RouterStore} from 'routing/Router/RouterStore';

interface TodosSearchRouteParams {
	search: string;
}

export class TodosSearchStore {

	constructor(private routing: RouterStore = routerStore) {
	}

	readonly searchText: string = this.routing.route.map((toState: RouteState) => {
		const params = toState.params as TodosSearchRouteParams;

		return params.search || '';
	});

	readonly setSearchText = (text: string) => {
		const state = this.routing.router.getState() as RouteState;
		const updatedText = (text != null && text.length > 0) ? text : null;

		this.routing.router.navigate(state.name, {search: updatedText}, {replace: true, reload: true});
	};
}

export const todosSearchStore = new TodosSearchStore();
