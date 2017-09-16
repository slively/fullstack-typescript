import {TodoEntity, CreateTodoEntity} from 'service-entities/todos';

export interface TodosListComponentProps {
	todos: TodoEntity[];
	refresh: () => void;
	addTodo: (todo: CreateTodoEntity) => void;
}
