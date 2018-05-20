import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MainLayout } from 'layouts/MainLayout';
import { Router } from 'routing/Router';
import { RouterStore } from 'routing/RouterStore';
import { ComponentRoutes, routes } from 'routing/routes';
import { Route } from 'router5';

// mount our routes and start the router
RouterStore.getInstance().start(componentRoutesToRoutes(routes));

ReactDOM.render(
	<MainLayout><Router /></MainLayout>,
	document.getElementById('root')
);

// convert our custom route config to router 5 routes
function componentRoutesToRoutes(componentRoute?: ComponentRoutes): Route[] {
	if (componentRoute == null) {
		return [];
	}

	return Object.keys(componentRoute).reduce(
		(flattenedRoutes: Route[], name: string) => {
			const route = componentRoute[name];
			const children = componentRoutesToRoutes(route.children);

			flattenedRoutes.push({ name, path: route.path, children });

			return flattenedRoutes;
		},
		[]
	);
}