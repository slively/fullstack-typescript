import * as React from 'react';
import { LinkProps } from 'routing/LinkProps';
import { Router } from 'router5';
import { MouseEvent } from 'react';

export interface LinkComponentProps extends LinkProps {
	router: Router;
}

/**
 * This component takes the properties of a link and an active Router5 router and will use the router to navigate to the link.
 */
export class LinkComponent extends React.Component<LinkComponentProps, {}> {
	render() {
		const { router, routeName, routeParams = {}, className, children } = this.props;
		const href = router.buildUrl(routeName, routeParams) as string;
		
		return <a href={href} className={className} onClick={this.handleOnClick}>{children}</a>;
	}

	handleOnClick = (evt: MouseEvent<HTMLAnchorElement>) => {
		const { router, routeName, routeParams = {}, routeOptions = {} } = this.props;
		const comboKey = evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey;

		if (evt.button === 0 && !comboKey) {
			evt.preventDefault();
			router.navigate(routeName, routeParams, routeOptions);
		}
	}
}
