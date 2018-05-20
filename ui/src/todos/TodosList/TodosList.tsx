import * as React from 'react';
import { TodosListComponent } from 'todos/TodosList/TodosListComponent';
import { TodosListViewModel } from 'todos/TodosList/TodosListViewModel';
import { observer } from 'mobx-react';

const todosListViewModel = TodosListViewModel.getInstance();

export const TodosList = observer(() =>
	<TodosListComponent
		todos={todosListViewModel.todos}
		refresh={todosListViewModel.refresh}
		addTodo={todosListViewModel.addTodo}
	/>
);