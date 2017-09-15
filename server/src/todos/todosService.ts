import {todosDao} from 'todos/todosDao';
import {CreateTodoEntity, TodoEntity} from 'service-entities/todos';
import {validateOrReject} from 'class-validator';
import {registerSchema} from 'class-validator';

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

export const todosService = {
	find(): Promise<TodoEntity> {
		return todosDao.find();
	},

	create(todo: CreateTodoEntity): Promise<TodoEntity> {
		return validateOrReject('todo', todo)
			.then(() => todosDao.create(todo));
	},

	update(todo: Partial<TodoEntity>): Promise<TodoEntity> {
		return validateOrReject('todo', todo, { skipMissingProperties: true })
			.then(() => todosDao.update(todo));
	},

	deleteById(id: number): Promise<boolean> {
		return todosDao.deleteById(id);
	}
};
