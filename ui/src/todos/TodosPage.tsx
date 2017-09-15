import * as React from 'react';
import {SPC} from 'lib/SPC';
import {TodosSearch} from 'todos/TodosSearch/TodosSearch';
import {TodosList} from 'todos/TodosList/TodosList';

export class TodosPage extends SPC<{}> {
	render() {
		return (
			<div>
				<h2>Todos</h2>
				<TodosSearch/>
				<TodosList/>
			</div>
		);
	}
}
