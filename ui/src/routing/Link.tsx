import * as React from 'react';
import { LinkComponent } from 'routing/LinkComponent';
import { LinkProps } from 'routing/LinkProps';
import { observer } from 'mobx-react';
import { RouterStore } from 'routing/RouterStore';

const routerStore = RouterStore.getInstance();

export const Link = observer(class extends React.Component<LinkProps, {}> {
	render() {
		return <LinkComponent {...this.props} router={routerStore.router} />;
	}
});
