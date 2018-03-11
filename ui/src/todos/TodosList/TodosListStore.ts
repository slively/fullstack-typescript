import {todosService} from 'todos/TodosService';
import {todosSearchStore, TodosSearchStore} from 'todos/TodosSearch/TodosSearchStore';
import {CrudService} from 'lib/CrudService';
import {action, computed, observable} from 'mobx';

export class TodosListStore {

	constructor(private serverTodos: TodoEntity[] = observable([]),
							private service: CrudService<TodoEntity, CreateTodoEntity> = todosService,
							private searchStore: TodosSearchStore = todosSearchStore) {
	}

	readonly todos = computed(() =>
		(this.searchStore.searchText.length > 0)
			? this.serverTodos.filter((todo: TodoEntity) => todo.text.includes(this.searchStore.searchText))
			: this.serverTodos
	);

	readonly refresh = action(() =>
		this.service
			.find()
			.then((todos: TodoEntity[]) => this.serverTodos = todos)
	);

	readonly addTodo = action((todo: CreateTodoEntity) =>
		this.service
			.create(todo)
			.then((addedTodo: TodoEntity) => this.serverTodos.push(addedTodo))
	);
}

export const todosListStore = new TodosListStore();
