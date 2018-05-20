import * as React from 'react';
import { ComponentRoutes } from 'routing/routes';

export interface RouterComponentProps {
	routeNames: string[];
	routes: ComponentRoutes;
}

export class RouterComponent extends React.Component<RouterComponentProps, {}> {

	/**
	 * Use the route names to look up and return the appropriate Component tree in the route configuration.
	 *
	 * @param routeNames
	 * @param nestedRoute
	 * @return Component
	 */
	routesToComponents(routeNames: string[], nestedRoute?: ComponentRoutes): JSX.Element | null {
		if (nestedRoute == null || routeNames.length === 0) {
			return null;
		}

		const route = nestedRoute[routeNames[0]];
		const Component = route.component;

		if (routeNames.length === 1) {
			return <Component />;
		}

		return <Component>{this.routesToComponents(routeNames.slice(1), route.children)}</Component>;
	}

	render() {
		const { routeNames, routes } = this.props;

		return this.routesToComponents(routeNames, routes);
	}
}
