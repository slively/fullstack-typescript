import { client } from 'client';
import { CreateTodoEntity, TodoEntity } from 'shared-models/todos';

const TODOS_PATH = '/api/todos';

describe('/todos', () => {

	it('should add two todos, update one, then delete one', async () => {
		const todo1: CreateTodoEntity = { text: 'foo' };
		const todo2: CreateTodoEntity = { text: 'foo2' };

		const createdTodo1: TodoEntity = (await client.post(TODOS_PATH).send(todo1).expect(200)).body;
		const createdTodo2: TodoEntity = (await client.post(TODOS_PATH).send(todo2).expect(200)).body;

		expect(createdTodo1.id).toBeDefined();
		expect(createdTodo1.text).toBe(todo1.text);
		expect(createdTodo2.id).toBeDefined();
		expect(createdTodo2.text).toBe(todo2.text);

		const todos: TodoEntity[] = (await client.get(TODOS_PATH).expect(200)).body;

		expect(todos).toEqual([createdTodo2, createdTodo1]);

		const updatedTodo: TodoEntity = (await client.patch(TODOS_PATH)
			.send({ ...createdTodo2, text: 'foo3' })
			.expect(200))
			.body;

		expect(updatedTodo.id).toBe(createdTodo2.id);
		expect(updatedTodo.text).toBe('foo3');

		const todos2: TodoEntity[] = (await client.get(TODOS_PATH).expect(200)).body;

		expect(todos2).toEqual([updatedTodo, createdTodo1]);

		await client.delete(`${TODOS_PATH}/${createdTodo1.id}`).expect(200);

		const todos3: TodoEntity[] = (await client.get(TODOS_PATH).expect(200)).body;

		await expect(todos3).toEqual([updatedTodo]);
	});
	
});
