export interface TodosListComponentProps {
	todos: TodoEntity[];
	refresh: () => void;
	addTodo: (todo: CreateTodoEntity) => void;
}
