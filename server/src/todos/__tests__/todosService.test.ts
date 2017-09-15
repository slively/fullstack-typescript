const todosDao = {
	find: jest.fn(),
	create: jest.fn(),
	update: jest.fn(),
	deleteById: jest.fn()
};

jest.mock('todos/todosDao', () => ({todosDao}));

import {todosService} from 'todos/todosService';
import DoneCallback = jest.DoneCallback;

describe('todosService', () => {
	beforeEach(() => jest.resetAllMocks());

	it('calls find on the dao', () => {
		todosService.find();

		expect(todosDao.find).toHaveBeenCalled();
	});

	it('calls create on the dao', () => {
		const todo = {text: 'foo', createdAt: new Date(), updatedAt: new Date()};

		return todosService.create(todo).then(
			() => expect(todosDao.create).toHaveBeenCalledWith(todo)
		);
	});

	it('throws a validation error when the new todo text has no length', (done: DoneCallback) => {
		const todo = {text: ''};

		todosService.create(todo).then(
			() => done.fail(),
			(err: any) => {
				expect(err).toMatchSnapshot();
				done();
			}
		);
	});

	it('calls update on the dao', () => {
		const todo = {text: 'foo'};

		return todosService.update(todo).then(
			() => expect(todosDao.update).toHaveBeenCalledWith(todo)
		);
	});

	it('calls deleteById on the dao', () => {
		const id = 101;

		todosService.deleteById(id);

		expect(todosDao.deleteById).toHaveBeenCalledWith(id);
	});
});
