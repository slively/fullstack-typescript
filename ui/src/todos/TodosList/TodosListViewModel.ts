import { todosService } from 'todos/TodosService';
import { CreateTodoEntity, TodoEntity } from 'shared-models/todos';
import { TodosSearchViewModel } from 'todos/TodosSearch/TodosSearchViewModel';
import { CrudService } from 'lib/CrudService';
import { observable, action, computed } from 'mobx';

export class TodosListViewModel {

	public static getInstance() {
		return this._instance || (this._instance = new TodosListViewModel());
	}

	private static _instance: TodosListViewModel;

	constructor(
		private service: CrudService<TodoEntity, CreateTodoEntity> = todosService,
		private todosSearchViewModel: TodosSearchViewModel = TodosSearchViewModel.getInstance()
	) { }

	@computed
	get todos() {
		return this._todos.filter(todo => todo.text.includes(this.todosSearchViewModel.searchText));
	}

	@action.bound
	async refresh() {
		this._todos = await this.service.find();
	}

	@action.bound
	async addTodo(todo: CreateTodoEntity) {
		const addedTodo = await this.service.create(todo);

		this._todos.push(addedTodo);
	}

	@observable
	private _todos: TodoEntity[] = [];
}
