import {CrudService} from 'lib/CrudService';
import {TodoEntity, CreateTodoEntity} from 'service-entities/todos';

export const todosService = new CrudService<TodoEntity, CreateTodoEntity>('/api/todos');
