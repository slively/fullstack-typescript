import {CrudService} from 'lib/CrudService';

export const todosService = new CrudService<TodoEntity, CreateTodoEntity>('/api/todos');
