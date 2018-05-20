import * as React from 'react';
import { RouterComponent } from 'routing/RouterComponent';
import { routes } from 'routing/routes';
import { observer } from 'mobx-react';
import { RouterStore } from 'routing/RouterStore';

const routerStore = RouterStore.getInstance();

export const Router = observer(() => <RouterComponent routes={routes} routeNames={routerStore.routeNames} />);