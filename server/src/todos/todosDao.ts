import {TimestampedPersistence} from 'lib/TimestampedPersistence';
import {dbClient} from 'database/dbClient';
import {isSuccessfullyDeleted} from 'lib/daoUtil';

export const TODOS_TABLE = 'todos';

export interface CreateTodoPersistence {
	text: string;
}

export interface TodoPersistence extends CreateTodoPersistence, TimestampedPersistence {
	id: number;
}

export const todosDao = {
	find(): Promise<TodoPersistence> {
		return dbClient(TODOS_TABLE)
			.select('*')
			.orderBy('updatedAt', 'DESC');
	},

	create(todo: CreateTodoPersistence): Promise<TodoPersistence> {
		return dbClient(TODOS_TABLE)
			.insert(todo)
			.returning('*')
			.get(0);
	},

	update(todo: Partial<TodoPersistence>): Promise<TodoPersistence> {
		return dbClient(TODOS_TABLE)
			.update({...todo, updatedAt: new Date(), createdAt: undefined})
			.where({id: todo.id})
			.returning('*')
			.get(0);
	},

	deleteById(id: number): Promise<boolean> {
		return dbClient(TODOS_TABLE)
			.where({id})
			.del()
			.then(isSuccessfullyDeleted);
	}
};
