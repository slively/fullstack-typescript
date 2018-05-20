import * as React from 'react';
import { TodosListSearchComponent } from './TodosSearchComponent';
import { TodosSearchViewModel } from './TodosSearchViewModel';
import { observer } from 'mobx-react';

const todosSearchViewModel = TodosSearchViewModel.getInstance();

export const TodosSearch = observer(() =>
	<TodosListSearchComponent
		searchText={todosSearchViewModel.searchText}
		setSearchText={todosSearchViewModel.setSearchText}
	/>
);