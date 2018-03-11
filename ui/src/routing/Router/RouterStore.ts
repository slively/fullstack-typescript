import router5CreateRouter from 'router5';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import {RouterStore} from 'mobx-router5';
import { mobxPlugin } from 'mobx-router5';

export const routerStore = new RouterStore();

// routes are added in RouterModel.ts
router5CreateRouter([], {allowNotFound: true, strictQueryParams: false})
	.usePlugin(browserPlugin())
	.usePlugin(listenersPlugin())
	.usePlugin(mobxPlugin(routerStore));

/*
export class RouterStore {
	constructor(readonly router: Router5 = router5,
							private originalRoute: Observable<RouteState> = route$,
							readonly transitionError: Observable<RouterEvent> = transitionError$,
							private originalTransitionRoute: Observable<RouterEvent> = transitionRoute$) {
	}

	route = this.originalRoute.map((state: RouteState) => state == null ? this.router.getState() as RouteState : state);

	readonly transitionRoute = this.originalTransitionRoute.map((event: RouterEvent) => {
		if (event == null) {
			// this is the first router event which is null for some reason so we populate it from the current router state
			return {
				fromState: undefined,
				toState: this.router.getState() as RouteState
			};
		}

		return event;
	});

	readonly routeNames = this.route.map((routeState: RouteState) => {
		// on page load the event is null so we use the initial router state
		const toState: RouteState = routeState == null ? this.router.getState() as RouteState : routeState;
		const routeName = toState && toState.name as string;

		// route names are dot delimited for a given route
		return routeName ? routeName.split('.') : [];
	});
}*/