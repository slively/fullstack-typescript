import * as React from 'react';
import {SPC} from 'lib/SPC';
import {RouterComponentProps} from 'routing/Router/RouterComponentProps';
import {Route} from 'routing/routes';

export class RouterComponent extends SPC<RouterComponentProps> {

	/**
	 * Use the route names to look up and return the appropriate Component tree in the route configuration.
	 *
	 * @param routeNames
	 * @param nestedRoute
	 * @return Component
	 */
	routesToComponents(routeNames: string[], nestedRoute?: Route): JSX.Element | null {
		if (nestedRoute == null || routeNames.length === 0) {
			return null;
		}

		const route = nestedRoute[routeNames[0]];
		const Component = route.component;

		if (routeNames.length === 1) {
			return <Component/>;
		}

		return <Component>{this.routesToComponents(routeNames.slice(1), route.children)}</Component>;
	}

	render() {
		const {routeNames, routes} = this.props;

		return this.routesToComponents(routeNames, routes);
	}
}
