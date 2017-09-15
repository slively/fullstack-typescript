import * as React from 'react';
import {SPC} from 'lib/SPC';
import {BaseLink} from 'routing/Link/BaseLink';
import {routerStore} from 'routing/Router/RouterStore';
import {LinkProps} from 'routing/Link/LinkProps';

/**
 * Connect the active router to a BaseLink component.
 */
export class Link extends SPC<LinkProps> {
	render() {
		return <BaseLink {...this.props} router={routerStore.router}/>;
	}
}
