import {TodoEntity, CreateTodoEntity} from 'shared-models/todos';

export interface TodosListComponentProps {
	todos: TodoEntity[];
	refresh: () => void;
	addTodo: (todo: CreateTodoEntity) => void;
}
