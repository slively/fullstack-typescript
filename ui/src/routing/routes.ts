import { HomePage } from 'home/Home';
import { NotFoundPage } from 'errors/NotFoundPage';
import { TodosPage } from 'todos/TodosPage';
import { constants } from 'router5';
import { Component } from 'react';

export interface ComponentRoutes {
	[name: string]: {
		path: string;
		component: new () => Component<{} | undefined, any>;
		children?: ComponentRoutes;
		params?: object;
	};
}

/**
 * Configuration of routes to components
 */
export const routes: ComponentRoutes = {
	index: {
		path: '/',
		component: HomePage
	},
	home: {
		path: '/home',
		component: HomePage
	},
	todos: {
		path: '/todos',
		component: TodosPage
	},
	[constants.UNKNOWN_ROUTE]: {
		path: '/oh-no',
		component: NotFoundPage
	}
};