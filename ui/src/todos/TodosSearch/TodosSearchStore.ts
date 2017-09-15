import {routerStore, RouterStore} from 'routing/Router/RouterStore';
import {RouteState} from 'rxjs-router5';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

interface TodosSearchRouteParams {
	search: string;
}

export class TodosSearchStore {

	constructor(private routing: RouterStore = routerStore) {
	}

	readonly searchText: Observable<string> = this.routing.route.map((toState: RouteState) => {
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
