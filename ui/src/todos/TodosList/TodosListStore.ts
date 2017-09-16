import {todosService} from 'todos/TodosService';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CreateTodoEntity, TodoEntity} from 'service-entities/todos';
import {Observable} from 'rxjs/Observable';
import {todosSearchStore, TodosSearchStore} from 'todos/TodosSearch/TodosSearchStore';
import {CrudService} from 'lib/CrudService';

export class TodosListStore {

	constructor(
		private serverTodos$: BehaviorSubject<TodoEntity[]> = new BehaviorSubject<TodoEntity[]>([]),
		private service: CrudService<TodoEntity, CreateTodoEntity> = todosService,
		private searchStore: TodosSearchStore = todosSearchStore
	) {}

	readonly todos = Observable.combineLatest(
		this.serverTodos$,
		this.searchStore.searchText,
		(todos: TodoEntity[], searchText: string) =>
			todos.filter((todo: TodoEntity) => (searchText.length > 0) ? todo.text.includes(searchText) : true)
	);

	readonly refresh = () => this.service.find().then((todos: TodoEntity[]) => this.serverTodos$.next(todos));

	readonly addTodo = (todo: CreateTodoEntity) =>
		this.service.create(todo).then(
			(addedTodo: TodoEntity) => this.serverTodos$.next([addedTodo, ...this.serverTodos$.value])
		);
}

export const todosListStore = new TodosListStore();
