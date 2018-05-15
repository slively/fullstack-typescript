import { TimestampedPersistence } from 'lib/timestamped_persistence';
import { isSuccessfullyDeleted } from 'lib/dao_util';
import { getDatabaseClient } from 'database/db_client';
import * as Knex from 'knex';

export const TODOS_TABLE = 'todos';

export interface CreateTodoPersistence {
	text: string;
}

export interface TodoPersistence extends CreateTodoPersistence, TimestampedPersistence {
	id: number;
}

export class TodosDao {

	public static getInstance() {
		return this._instance || (this._instance = new TodosDao());
	}

	private static _instance: TodosDao;

	constructor(
		private dbClient: Knex = getDatabaseClient()
	) { }

	async find(): Promise<TodoPersistence> {
		return this.dbClient(TODOS_TABLE)
			.select('*')
			.orderBy('updatedAt', 'DESC');
	}

	async create(todo: CreateTodoPersistence): Promise<TodoPersistence> {
		return this.dbClient(TODOS_TABLE)
			.insert(todo)
			.returning('*')
			.get<TodoPersistence>(0);
	}

	async update(todo: Partial<TodoPersistence>): Promise<TodoPersistence> {
		return this.dbClient(TODOS_TABLE)
			.update({ ...todo, updatedAt: new Date(), createdAt: undefined })
			.where({ id: todo.id })
			.returning('*')
			.get<TodoPersistence>(0);
	}

	async deleteById(id: number): Promise<boolean> {
		return this.dbClient(TODOS_TABLE)
			.where({ id })
			.del()
			.then(isSuccessfullyDeleted);
	}
}