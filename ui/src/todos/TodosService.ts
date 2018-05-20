import { CrudService } from 'lib/CrudService';
import { TodoEntity, CreateTodoEntity } from 'shared-models/todos';

export const todosService = new CrudService<TodoEntity, CreateTodoEntity>('/api/todos');
