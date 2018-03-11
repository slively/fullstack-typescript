import {RouterComponent} from 'routing/Router/RouterComponent';
import {routerStore} from 'routing/Router/RouterStore';
import {RouterComponentProps} from './RouterComponentProps';
import {Route, routes} from 'routing/routes';
import {observer} from 'mobx-react';

interface FlatRoute {
	name: string;
	path: string;
	children?: FlatRoute[];
}

function nestedRouteToFlatRoutes(nested?: Route): FlatRoute[] {
	if (nested == null) {
		return [];
	}

	return Object.keys(nested).reduce(
		(flatRoutes: FlatRoute[], name: string) => {
			const route = nested[name];
			const children = nestedRouteToFlatRoutes(route.children);

			flatRoutes.push({name, path: route.path, children});

			return flatRoutes;
		},
		[]
	);
}

/**
 * Convert configuration to Router5 configuration, add routes to router, and start the router
 */
routerStore.router.add(nestedRouteToFlatRoutes(routes)).start();

const routerObservable = combineLatestObj<RouterComponentProps>({
	routes,
	routeNames: routerStore.routeNames
});

export const Router = observer(routerObservable)(RouterComponent, 'Router');
