import { TodosDao } from 'todos/todos_dao';
import { CreateTodoEntity, TodoEntity } from 'shared-models/todos';
import { validateOrReject } from 'class-validator';
import { registerSchema } from 'class-validator';

registerSchema({
	name: 'todo',
	properties: {
		text: [{
			type: 'minLength',
			constraints: [1],
			options: undefined
		}]
	}
});

export class TodosService {
	public static getInstance() {
		return this._instance || (this._instance = new TodosService());
	}

	private static _instance: TodosService;

	constructor(
		private todosDao: TodosDao = TodosDao.getInstance()
	) { }

	async find(): Promise<TodoEntity> {
		return this.todosDao.find();
	}

	async create(todo: CreateTodoEntity): Promise<TodoEntity> {
		await validateOrReject('todo', todo);
		return this.todosDao.create(todo);
	}

	async update(todo: Partial<TodoEntity>): Promise<TodoEntity> {
		await validateOrReject('todo', todo, { skipMissingProperties: true });
		return this.todosDao.update(todo);
	}

	async deleteById(id: number): Promise<boolean> {
		return this.todosDao.deleteById(id);
	}
}